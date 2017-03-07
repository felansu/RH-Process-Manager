(function () {
	'use strict';

	angular
		.module('is')
		.service('AvaliadorService', MainService);

	/* @ngInject */
	function MainService() {
		var self = this;

		self.salvar = salvar;

		function salvar(avaliador) {
			return firebase.database()
				.ref()
				.child("avaliadores")
				.push(avaliador)
				.then(function (result) {
					console.log(result.key);
					return !!result.key;
				});
		}
	}

})();

