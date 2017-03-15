(function () {

	'use strict';

	angular
		.module('is')
		.controller('CandidatoController', CandidatoController);

	/* @ngInject */
	function CandidatoController(CandidatoService, IsAlertService, $scope) {

		var vm = this;

		vm.tituloPagina = 'Candidato';
		vm.candidato = {};

		vm.salvar = salvar;
		vm.listarSexos = listarSexos;
		vm.listarFormacoes = listarFormacoes;
		vm.limpar = limpar;
		vm.editar = editar;
		vm.eliminar = eliminar;
		vm.switchCard = switchCard;

		init();

		function init() {
			listar();
		}

		function salvar() {
			CandidatoService.salvar(vm.candidato)
				.then(function (result) {
					if (result) {
						vm.limpar();
						listar();
						IsAlertService.showSuccess('Registro salvo !');
					}
				});
		}

		function editar(key) {
			vm.candidato = vm.candidatos[key];
			vm.candidato.key = key;
			vm.switchCard();
		}

		function eliminar(key) {
			CandidatoService.eliminar(key)
				.then(function (result) {
					if (result) {
						listar();
						if (Object.keys(vm.candidatos).length <= 1) {
							vm.switchCard();
						}
						IsAlertService.showSuccess('Registro eliminado !');
					}
				});
		}

		function listar() {
			vm.listaCarregada = false;
			CandidatoService.listar()
				.then(function (result) {
					vm.candidatos = result;
					vm.listaCarregada = true;
					$scope.$applyAsync();
				});
		}

		function listarSexos() {
			return CandidatoService.listarSexos()
				.then(function (result) {
					return result;
				});
		}

		function listarFormacoes() {
			return CandidatoService.listarFormacoes()
				.then(function (result) {
					return result;
				});
		}

		function limpar() {
			vm.candidato = {};
		}

		function switchCard() {
			vm.cardReveal = $('.card-reveal .card-title') ? $('.card-reveal .card-title') : $('.card .activator');
			vm.cardReveal.click();
		}
	}
})
();