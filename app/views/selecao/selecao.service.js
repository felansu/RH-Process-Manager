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
	}

})();

