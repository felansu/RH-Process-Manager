(function () {
	'use strict';

	angular
		.module('is')
		.service('ProgramaService', ProgramaService);

	/* @ngInject */
	function ProgramaService($http) {
		var self = this;

		self.salvar = salvar;
		self.eliminar = eliminar;
		self.listar = listar;
		self.listarUnidades = listarUnidades;

		function salvar(programa) {
			if (programa.key) {
				return firebase.database()
					.ref()
					.child('programas/' + programa.key)
					.set(programa)
					.then(function () {
						return true;
					});
			} else {
				return firebase.database()
					.ref()
					.child('programas')
					.push(programa)
					.then(function (result) {
						return !!result.key;
					});
			}
		}

		function listar() {
			return firebase.database()
				.ref()
				.child('programas')
				.once('value')
				.then(function (response) {
					return response.val();
				});
		}

		function eliminar(key) {
			return firebase.database()
				.ref('programas')
				.child(key)
				.remove()
				.then(function () {
					return true;
				});
		}

		function listarUnidades() {
			return $http.get('views/programa/unidades.json')
				.then(result);

			function result(response) {
				return response.data;
			}
		}
	}

})();