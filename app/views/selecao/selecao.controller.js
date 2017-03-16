(function () {

	'use strict';

	angular
		.module('is')
		.controller('SelecaoController', SelecaoController);

	/* @ngInject */
	function SelecaoController(SelecaoService, IsAlertService, ProgramaService, AvaliadorService,
	                           CandidatoService, CriterioService, $mdStepper, $scope) {

		var vm = this;

		vm.tituloPagina = 'Seleção';

		vm.selecao = {};
		vm.selecao.avaliadores = [];
		vm.selecao.candidatos = [];
		vm.selecao.criterios = [];
		vm.selecoes = [];
		vm.listaProgramas = {};
		vm.listaAvaliadores = {};
		vm.listaCandidatos = {};
		vm.listaCriterios = {};

		vm.cardReveal = {};

		vm.salvar = salvar;
		vm.listarProgramas = listarProgramas;
		vm.next = next;
		vm.back = back;
		vm.finalizar = finalizar;
		vm.addAvaliador = addAvaliador;
		vm.addCandidato = addCandidato;
		vm.addCriterio = addCriterio;

		vm.selectControl = {};

		// init();

		// function init() {
		// listar();
		// }

		function salvar() {
			SelecaoService.salvar(vm.selecao)
				.then(function (result) {
					if (result) {
						limpar();
						// listar();
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

		// function listar(funcao) {
		// 	vm.listaCarregada = false;
		// 	SelecaoService.listar()
		// 		.then(function (result) {
		// 			vm.selecoes = result;
		// 			vm.listaCarregada = true;
		// 			if (funcao) {
		// 				funcao();
		// 			}
		// 		});
		// }

		function listarProgramas() {
			vm.listaProgramasCarregada = false;
			return ProgramaService.listar()
				.then(function (result) {
					debugger;
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
				listarAvaliadores();
			} else if (steppers.currentStep === 2) {
				listarCandidatos();
			} else if (steppers.currentStep === 3) {
				listarCriterios();
			}
		}

		function back() {
			var steppers = $mdStepper('selecao');
			steppers.back();
		}

		function finalizar() {
			var steppers = $mdStepper('selecao');
			salvar();
			steppers.next();
		}

		function addAvaliador(avaliador) {
			var index = vm.selecao.avaliadores.indexOf(avaliador);
			if (index != -1) {
				vm.selecao.avaliadores.splice(index, 1);
			} else {
				vm.selecao.avaliadores.push(avaliador)
			}
		}

		function addCandidato(candidato) {
			var index = vm.selecao.candidatos.indexOf(candidato);
			if (index != -1) {
				vm.selecao.candidatos.splice(index, 1);
			} else {
				vm.selecao.candidatos.push(candidato)
			}
		}

		function addCriterio(criterio) {
			var index = vm.selecao.criterios.indexOf(criterio);
			if (index != -1) {
				vm.selecao.criterios.splice(index, 1);
			} else {
				vm.selecao.criterios.push(criterio)
			}
		}
	}
})();