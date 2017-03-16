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

				selecao.avaliadores.forEach(function (avaliador) {
					var promiseAvaliadores = firebase.database()
						.ref('avaliadores')
						.child(avaliador)
						.once('value')
						.then(function (avaliadorResponse) {
							selecaoResult.avaliadores.push(avaliadorResponse.val());
						});
					promises.push(promiseAvaliadores);
				});

				selecao.candidatos.forEach(function (candidato) {
					var promiseCandidatos = firebase.database()
						.ref('candidatos')
						.child(candidato)
						.once('value')
						.then(function (candidatoResponse) {
							selecaoResult.candidatos.push(candidatoResponse.val());
						});
					promises.push(promiseCandidatos);
				});

				selecao.criterios.forEach(function (criterio) {
					var promiseCriterios = firebase.database()
						.ref('criterios')
						.child(criterio)
						.once('value')
						.then(function (criterioResponse) {
							selecaoResult.criterios.push(criterioResponse.val());
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

