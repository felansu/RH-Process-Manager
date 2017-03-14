(function () {
	'use strict';

	angular
		.module('is')
		.service('CriterioService', CriterioService);

	/* @ngInject */
	function CriterioService($http) {
		var self = this;

		self.salvar = salvar;
		self.listar = listar;
		self.eliminar = eliminar;
		self.listarTiposCriterios = listarTiposCriterios;

		function salvar(criterio) {
			if (criterio.key) {
				return firebase.database()
					.ref()
					.child('criterios/' + criterio.key)
					.set(criterio)
					.then(function () {
						return true;
					});
			} else {
				return firebase.database()
					.ref()
					.child('criterios')
					.push(criterio)
					.then(function (result) {
						return !!result.key;
					});
			}
		}

		function eliminar(key) {
			return firebase.database()
				.ref('criterios')
				.child(key)
				.remove()
				.then(function () {
					return true;
				});
		}

		function listar() {
			return firebase.database()
				.ref()
				.child('criterios')
				.once('value')
				.then(function (response) {
					return response.val();
				});
		}

		function listarTiposCriterios() {
			return $http.get('views/criterio/tiposCriterios.json')
				.then(result);

			function result(response) {
				return response.data;
			}
		}
	}

})();

