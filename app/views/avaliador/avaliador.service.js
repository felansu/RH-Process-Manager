(function () {
	'use strict';

	angular
		.module('is')
		.service('AvaliadorService', MainService);

	/* @ngInject */
	function MainService() {
		var self = this;

		self.salvar = salvar;
		self.listar = listar;
		self.eliminar = eliminar;

		function salvar(avaliador) {
			if (avaliador.key) {
				return firebase.database()
					.ref()
					.child('avaliadores/' + avaliador.key)
					.set(avaliador)
					.then(function () {
						return true;
					});
			} else {
				return firebase.database()
					.ref()
					.child('avaliadores')
					.push(avaliador)
					.then(function (result) {
						return !!result.key;
					});
			}
		}

		function eliminar(key) {
			return firebase.database()
				.ref('avaliadores')
				.child(key)
				.remove()
				.then(function () {
					return true;
				});
		}

		function listar() {
			return firebase.database()
				.ref()
				.child('avaliadores')
				.once('value')
				.then(function (response) {
					return response.val();
				});
		}

	}

})();

