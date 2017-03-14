(function () {

	'use strict';

	angular
		.module('is')
		.controller('ProgramaController', ProgramaController);

	/* @ngInject */
	function ProgramaController(ProgramaService, $scope, IsAlertService) {

		var vm = this;

		vm.tituloPagina = 'Programa';
		vm.programa = {};
		vm.programas = [];

		vm.salvar = salvar;
		vm.limpar = limpar;
		vm.listar = listar;
		vm.listarUnidades = listarUnidades;
		vm.eliminar = eliminar;
		vm.editar = editar;
		vm.switchCard = switchCard;

		init();

		function init() {
			listar();
		}

		function salvar() {
			ProgramaService.salvar(vm.programa)
				.then(function (result) {
					if (result) {
						vm.limpar();
						vm.listar();
						IsAlertService.showSuccess('Registro salvo !');
					}
				});
		}

		function listar() {
			vm.listaCarregada = false;
			ProgramaService.listar()
				.then(function (result) {
					vm.programas = result;
					vm.listaCarregada = true;
					$scope.$applyAsync();
				});
		}

		function editar(key) {
			vm.programa = vm.programas[key];
			vm.programa.key = key;
			vm.switchCard();
		}

		function eliminar(key) {
			ProgramaService.eliminar(key)
				.then(function (result) {
					if (result) {
						listar();
						if (Object.keys(vm.programas).length <= 1) {
							vm.switchCard();
						}
						IsAlertService.showSuccess('Registro eliminado !');
					}
				});
		}

		function switchCard() {
			vm.cardReveal = $('.card-reveal .card-title') ? $('.card-reveal .card-title') : $('.card .activator');
			vm.cardReveal.click();
		}

		function limpar() {
			vm.programa = {};
		}

		function listarUnidades() {
			return ProgramaService.listarUnidades()
				.then(function (result) {
					return result;
				});
		}
	}
})();