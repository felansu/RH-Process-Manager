(function () {
	'use strict';

	angular
		.module('is')
		.service('CandidatoService', CandidatoService);

	/* @ngInject */
	function CandidatoService() {
		var self = this;

		self.salvar = salvar;

		function salvar(candidato) {
			return firebase.database()
				.ref()
				.child("candidatos")
				.push(candidato)
				.then(function (result) {
					console.log(result.key);
					return !!result.key;
				});
		}
	}

})();

