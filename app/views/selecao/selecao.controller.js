(function () {

	'use strict';

	angular
		.module('is')
		.controller('SelecaoController', SelecaoController);

	/* @ngInject */
	function SelecaoController(SelecaoService, IsAlertService, ProgramaService, CriterioService, $mdStepper, $scope,
	                           IsStorageService, CandidatoService) {

		var vm = this;

		vm.tituloPagina = 'Seleção';

		vm.selecao = {};
		vm.selecoes = [];
		vm.listaProgramas = {};
		vm.listaCriterios = {};

		vm.cardReveal = {};

		vm.salvar = salvar;
		vm.listarProgramas = listarProgramas;
		vm.next = next;
		vm.back = back;
		vm.finalizar = finalizar;

		function salvar() {
			SelecaoService.salvar(vm.selecao)
				.then(function (result) {
					if (result) {
						limpar();
						IsAlertService.showSuccess('Registro salvo !');
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

		function listarCriterios() {
			vm.listaCriteriosCarregada = false;
			CriterioService.listar()
				.then(function (result) {
					vm.listaCriterios = result;
					vm.listaCriteriosCarregada = true;
					$scope.$applyAsync();
				});
		}

		function listarCandidatosPrograma() {
			vm.listaCandidatosProgramaCarregada = false;
			ProgramaService.listarCandidatosPrograma(vm.selecao.programa)
				.then(function (result) {
					vm.listaCandidatosPrograma = result;
					vm.listaCandidatosProgramaCarregada = true;
					$scope.$applyAsync();
				});
		}

		function getUsuarioSessao() {
			return IsStorageService.get('usuarioLogado');
		}

		function limpar() {
			vm.selecao = {};
		}

		function next() {
			var steppers = $mdStepper('selecao');
			steppers.next();
			if (steppers.currentStep === 1) {
				listarCriterios();
				listarCandidatosPrograma();
			}
		}

		function back() {
			var steppers = $mdStepper('selecao');
			steppers.back();
		}

		function finalizar() {
			var usuarioLogado = getUsuarioSessao();

			/**
			 * !TODO
			 * Substituir cadastro de avaliadores por um de contas de usuário.
			 * Aqui iria salvar o ID da conta do usuário
			 *
			 **/

			vm.selecao.avaliador = usuarioLogado;
			var steppers = $mdStepper('selecao');
			salvar();
			steppers.next();
		}

	}
})();