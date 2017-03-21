(function () {

	'use strict';

	angular
		.module('is')
		.controller('DetalhesSelecaoController', DetalhesSelecaoController);

	/* @ngInject */
	function DetalhesSelecaoController(SelecaoService, IsAlertService, $stateParams, $scope) {

		var vm = this;

		vm.tituloPagina = 'Detalhes Seleção';

		vm.selecao = {};

		init();

		function init() {
			var key = $stateParams.key;
			if (key) {
				SelecaoService.getByKey(key)
					.then(function (result) {
						vm.selecao = result;
						$scope.$applyAsync();
					});
			}else{
				IsAlertService.showError("Sem dados")
			}
		}

	}
})();