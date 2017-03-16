(function () {

	'use strict';

	angular
		.module('is')
		.controller('DetalhesSelecaoController', DetalhesSelecaoController);

	/* @ngInject */
	function DetalhesSelecaoController(SelecaoService, IsAlertService, $stateParams) {

		var vm = this;

		vm.tituloPagina = 'Detalhes Seleção';

		vm.selecao = {};

		init();

		function init() {
			SelecaoService.getByKey($stateParams.key)
				.then(function (result) {
					vm.selecao = result;
				});
		}

	}
})();