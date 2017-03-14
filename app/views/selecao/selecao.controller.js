(function () {

	'use strict';

	angular
		.module('is')
		.controller('SelecaoController', SelecaoController);

	/* @ngInject */
	function SelecaoController(SelecaoService,
	                           IsAlertService,
	                           ProgramaService,
	                           AvaliadorService,
	                           CandidatoService,
	                           CriterioService,
	                           $mdStepper,
	                           $scope) {

		var vm = this;

		vm.tituloPagina = 'Seleção';

		vm.selecao = {};
		vm.selecoes = [];
		vm.listaProgramas = {};
		vm.listaAvaliadores = {};
		vm.listaCandidatos = {};
		vm.listaCriterios = {};

		vm.cardReveal = {};

		vm.salvar = salvar;
		vm.editar = editar;
		vm.eliminar = eliminar;
		vm.limpar = limpar;
		vm.switchCard = switchCard;
		vm.listarProgramas = listarProgramas;
		vm.listarAvaliadores = listarAvaliadores;
		vm.listarCandidatos = listarCandidatos;
		vm.listarCriterios = listarCriterios;
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

		function listarAvaliadores() {
			vm.listaAvaliadoresCarregada = false;
			AvaliadorService.listar()
				.then(function (result) {
					vm.listaAvaliadores = result;
					vm.listaAvaliadoresCarregada = true;
					$scope.$applyAsync();
				});
		}

		function listarCandidatos() {
			vm.listaCandidatosCarregada = false;
			CandidatoService.listar()
				.then(function (result) {
					vm.listaCandidatos = result;
					vm.listaCandidatosCarregada = true;
					$scope.$applyAsync();
				});
		}

		function listarCriterios() {
			vm.listaCriteriosCarregada = false;
			CriterioService.listar()
				.then(function (result) {
					vm.listaCriterios = result;
					vm.listaCriteriosCarregada = true;
					$scope.$applyAsync();
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
			steppers.next();
			if (steppers.currentStep === 1) {
				vm.listarAvaliadores();
			} else if (steppers.currentStep === 2) {
				vm.listarCandidatos();
			} else if (steppers.currentStep === 3) {
				vm.listarCriterios();
			}
		}

		function back() {
			var steppers = $mdStepper('selecao');
			steppers.back();

		}
	}
})();