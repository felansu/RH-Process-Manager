(function () {

	'use strict';

	angular
		.module('is')
		.controller('AvaliadorController', AvaliadorController);

	/* @ngInject */
	function AvaliadorController(AvaliadorService, IsAlertService, $scope) {

		var vm = this;

		vm.tituloPagina = 'Avaliador';
		vm.avaliador = {};
		vm.avaliadores = [];

		vm.salvar = salvar;
		vm.editar = editar;
		vm.eliminar = eliminar;
		vm.limpar = limpar;
		vm.switchCard = switchCard;

		init();

		function init() {
			listar();
		}

		function salvar() {
			AvaliadorService.salvar(vm.avaliador)
				.then(function (result) {
					if (result) {
						vm.limpar();
						listar();
						IsAlertService.showSuccess('Registro salvo !');
					}
				});
		}

		function editar(key) {
			vm.avaliador = vm.avaliadores[key];
			vm.avaliador.key = key;
			vm.switchCard();
		}

		function eliminar(key) {
			AvaliadorService.eliminar(key)
				.then(function (result) {
					if (result) {
						listar();
						if (Object.keys(vm.avaliadores).length <= 1) {
							vm.switchCard();
						}
						IsAlertService.showSuccess('Registro eliminado !');
					}
				});
		}

		function listar() {
			vm.listaCarregada = false;
			AvaliadorService.listar()
				.then(function (result) {
					vm.avaliadores = result;
					vm.listaCarregada = true;
					$scope.$applyAsync();
				});
		}

		function switchCard() {
			vm.cardReveal = $('.card-reveal .card-title') ? $('.card-reveal .card-title') : $('.card .activator');
			vm.cardReveal.click();
		}

		function limpar() {
			vm.avaliador = {};
		}

	}
})();