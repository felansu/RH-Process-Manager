(function () {

	'use strict';

	angular
		.module('is')
		.controller('CriterioController', CriterioController);

	/* @ngInject */
	function CriterioController(CriterioService, $scope, IsAlertService) {

		var vm = this;

		vm.tituloPagina = 'Critério';

		vm.criterio = {};
		vm.criterios = [];
		vm.select = {};
		vm.cardReveal = {};
		vm.tiposCriterios = [];

		vm.salvar = salvar;
		vm.editar = editar;
		vm.eliminar = eliminar;
		vm.limpar = limpar;
		vm.switchCard = switchCard;
		vm.listarTiposCriterios = listarTiposCriterios;

		vm.selectControl = {};

		init();

		function init() {
			listar();
		}

		function listarTiposCriterios() {
			return CriterioService.listarTiposCriterios()
				.then(function (result) {
					return result;
				});
		}

		function salvar() {
			CriterioService.salvar(vm.criterio)
				.then(function (result) {
					if (result) {
						vm.limpar();
						listar();
						IsAlertService.showSuccess('Registro salvo !');
					}
				});
		}

		function editar(key) {
			vm.criterio = vm.criterios[key];
			vm.criterio.key = key;
			vm.switchCard();
		}

		function eliminar(key) {
			CriterioService.eliminar(key)
				.then(function (result) {
					if (result) {
						listar();
						if (Object.keys(vm.criterios).length <= 1) {
							vm.switchCard();
						}
						IsAlertService.showSuccess('Registro eliminado !');
					}
				});
		}

		function listar() {
			vm.listaCarregada = false;
			CriterioService.listar()
				.then(function (result) {
					vm.criterios = result;
					vm.listaCarregada = true;
					$scope.$applyAsync();
				});
		}

		function switchCard() {
			vm.cardReveal = $('.card-reveal .card-title') ? $('.card-reveal .card-title') : $('.card .activator');
			vm.cardReveal.click();
		}

		function limpar() {
			vm.criterio = {};
		}
	}
})();