(function () {
	'use strict';

	angular
		.module('is')
		.service('ProgramaService', ProgramaService);

	/* @ngInject */
	function ProgramaService($http) {
		var self = this;

		self.salvar = salvar;
		self.listar = listar;
		self.listarUnidades = listarUnidades;

		function salvar(programa) {
			return firebase.database()
				.ref()
				.child("programas")
				.push(programa)
				.then(function (result) {
					console.log(result.key);
					return !!result.key;
				});
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

		function listarUnidades() {
			return $http.get('views/programa/unidades.json')
				.then(result);

			function result(response) {
				return response.data;
			}
		}
	}

})();