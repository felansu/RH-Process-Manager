(function () {
	'use strict';

	angular
		.module('is')
		.service('CriterioService', CriterioService);

	/* @ngInject */
	function CriterioService() {
		var self = this;

		self.salvar = salvar;
		self.listar = listar;

		function salvar(criterio) {
			return firebase.database()
				.ref()
				.child("criterios")
				.push(criterio)
				.then(function (result) {
					console.log(result.key);
					return !!result.key;
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
	}

})();

