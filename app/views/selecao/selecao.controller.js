(function () {

	'use strict';

	angular
		.module('is')
		.controller('SelecaoController', SelecaoController);

	/* @ngInject */
	function SelecaoController(SelecaoService, IsAlertService, ProgramaService, $mdStepper, $scope) {

		var vm = this;

		vm.tituloPagina = 'Seleção';

		vm.selecao = {};
		vm.selecoes = [];
		vm.listaProgramas = {};

		vm.cardReveal = {};

		vm.salvar = salvar;
		vm.editar = editar;
		vm.eliminar = eliminar;
		vm.limpar = limpar;
		vm.switchCard = switchCard;
		vm.listarProgramas = listarProgramas;
		vm.next = next;
		vm.back = back;

		vm.selectControl = {};

		init();

		function init() {
			listar();
		}

		function salvar() {
			SelecaoService.salvar(vm.selecao)
				.then(function (result) {
					if (result) {
						vm.limpar();
						listar();
						IsAlertService.showSuccess('Registro salvo !');
					}
				});
		}

		function editar(key) {
			vm.selecao = vm.selecoes[key];
			vm.selecao.key = key;
			vm.switchCard();
		}

		function eliminar(key) {
			SelecaoService.eliminar(key)
				.then(function (result) {
					if (result) {
						listar(function () {
							if (!vm.selecoes) {
								vm.switchCard();
							}
						});
						IsAlertService.showSuccess('Registro eliminado !');
					}
				});
		}

		function listar(funcao) {
			vm.listaCarregada = false;
			SelecaoService.listar()
				.then(function (result) {
					vm.selecoes = result;
					vm.listaCarregada = true;
					if (funcao) {
						funcao();
					}
				});
		}

		function listarProgramas() {
			vm.listaProgramasCarregada = false;
			return ProgramaService.listar()
				.then(function (result) {
					vm.listaProgramasCarregada = true;
					$scope.$applyAsync();
					return result;
				});
		}

		function switchCard() {
			vm.cardReveal = $('.card-reveal .card-title') ? $('.card-reveal .card-title') : $('.card .activator');
			vm.cardReveal.click();
		}

		function limpar() {
			vm.selecao = {};
		}

		function next() {
			var steppers = $mdStepper('selecao');

			if (!vm.selecao.programa) {
				steppers.error('Eita, falta definir o programa cara !');
			} else {
				steppers.next();
			}
		}

		function back() {
			var steppers = $mdStepper('selecao');
			steppers.back();

		}
	}
})();