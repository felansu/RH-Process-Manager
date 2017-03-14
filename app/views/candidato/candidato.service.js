(function () {
	'use strict';

	angular
		.module('is')
		.service('CandidatoService', CandidatoService);

	/* @ngInject */
	function CandidatoService($http) {
		var self = this;

		self.salvar = salvar;
		self.listar = listar;

		function salvar(candidato) {
			return firebase.database()
				.ref()
				.child('candidatos')
				.push(candidato)
				.then(function (result) {
					console.log(result.key);
					return !!result.key;
				});
		}


		function listar() {
			return firebase.database()
				.ref()
				.child('candidatos')
				.once('value')
				.then(function (response) {
					return response.val();
				});
		}

	}

})();

