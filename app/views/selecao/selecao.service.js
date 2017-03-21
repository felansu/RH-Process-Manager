(function () {
	'use strict';

	angular
		.module('is')
		.service('SelecaoService', SelecaoService);

	/* @ngInject */
	function SelecaoService() {
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
						debugger;
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
				selecaoResult.programa = {};
				selecaoResult.avaliadores = [];
				selecaoResult.candidatos = [];
				selecaoResult.criterios = [];

				var promisePrograma = firebase.database()
					.ref('programas')
					.child(selecao.programa)
					.once('value')
					.then(function (programaResponse) {
						selecaoResult.programa = programaResponse.val();
					});
				promises.push(promisePrograma);

				var criterios = $.map(selecao.criterios, function (value, key) {
					return {key: key, value: value};
				});

				criterios.forEach(function (criterio) {
					var promiseCriterios = firebase.database()
						.ref('criterios')
						.child(criterio.key)
						.once('value')
						.then(function (criterioResponse) {

							var criterioResult = criterioResponse.val();
							criterioResult.key = criterio.key;
							criterioResult.notas = [];

							var keysCandidatos = Object.keys(criterio.value);

							keysCandidatos.forEach(function (key) {
								firebase.database()
									.ref('candidatos')
									.child(key)
									.once('value')
									.then(function (candidatoResponse) {
										criterioResult.notas.push({
											"nota": criterio.value[key],
											"candidato": candidatoResponse.val().nome
										});
										selecaoResult.criterios.push(criterioResult);
									});
							});
						});
					promises.push(promiseCriterios);

				});

				return Promise.all(promises).then(function (data) {
					return selecaoResult;
				});
			});
		}
	}

})();

