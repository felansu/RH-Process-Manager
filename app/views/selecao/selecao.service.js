(function () {
	'use strict';

	angular
		.module('is')
		.service('SelecaoService', SelecaoService);

	/* @ngInject */
	function SelecaoService($q) {
		var self = this;

		self.salvar = salvar;
		self.listar = listar;
		self.eliminar = eliminar;
		self.getByKey = getByKey;

		function salvar(selecao) {
			if (selecao.key) {
				return firebase.database()
					.ref()
					.child('selecoes/' + selecao.key)
					.set(selecao)
					.then(function () {
						return true;
					});
			} else {
				return firebase.database()
					.ref()
					.child('selecoes')
					.push(selecao)
					.then(function (result) {
						return !!result.key;
					});
			}
		}

		function eliminar(key) {
			return firebase.database()
				.ref('selecoes')
				.child(key)
				.remove()
				.then(function () {
					return true;
				});
		}

		function listar() {
			return firebase.database()
				.ref()
				.child('selecoes')
				.once('value')
				.then(function (response) {
					return response.val();
				});
		}

		function getByKey(key) {
			return firebase.database().ref('selecoes').child(key).once('value').then(function (response) {
				var promises = [];
				var selecao = response.val();

				var selecaoResult = {};
				selecaoResult.criterios = [];

				var db = {};
				db.criterios = [];
				db.candidatos = [];


				var promisePrograma = firebase.database()
					.ref('programas')
					.child(selecao.programa)
					.once('value')
					.then(function (programaResponse) {
						selecaoResult.programa = programaResponse.val();
					});

				var promiseCriterios = firebase.database()
					.ref()
					.child('criterios')
					.once('value')
					.then(function (criteriosResponse) {
						db.criterios = criteriosResponse.val();
					});

				var promiseCandidatos = firebase.database()
					.ref()
					.child('candidatos')
					.once('value')
					.then(function (candidatosResponse) {
						db.candidatos = candidatosResponse.val();
					});

				promises.push(promisePrograma, promiseCriterios, promiseCandidatos);

				function montaResponse(selecao, db) {
					var deferred = $q.defer();

					var criteriosSelecao = Object.entries(selecao.criterios);
					var criterioTemp = {};
					for (var i = 0; i < criteriosSelecao.length; i++) {
						var obj = criteriosSelecao[i];
						if (db.criterios[obj[0]] != null) {
							criterioTemp = db.criterios[obj[0]];
							var candidatos = Object.entries(obj[1]);
							criterioTemp.nota = [];
							for (var y = 0; y < candidatos.length; y++) {
								var candidato = candidatos[y];
								if (db.candidatos[candidato[0]] != null) {
									criterioTemp.nota.push({
										"candidato": db.candidatos[candidato[0]],
										"nota": parseInt(candidato[1])
									});
								}
							}
							selecaoResult.criterios.push(criterioTemp);
						}
					}
					deferred.resolve();
					return deferred.promise;
				}

				return Promise.all(promises).then(function () {
					return montaResponse(selecao, db).then(function () {
						return selecaoResult;
					});
				});
			});
		}
	}

})();

