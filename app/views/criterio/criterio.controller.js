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

		init();

		function init() {
			listar();
			iniciaTiposCriterios();
			iniciaSelect();
		}

		function iniciaTiposCriterios() {
			vm.tiposCriterios = [
				{id: 'number', descricao: 'Numérico'},
				{id: 'boolean', descricao: 'Verdadeiro / Falso'},
				{id: 'text', descricao: 'Texto'}
			]
		}

		function iniciaSelect() {
			$(document).ready(function () {
				vm.select = $('select');
				vm.select.prop('selectedIndex', 0);
				vm.select.material_select();
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
			var indexTipoCriterio = vm.tiposCriterios.map(function (e) {
				return e.id;
			}).indexOf(vm.criterio.tipo);
			vm.select.prop('selectedIndex', indexTipoCriterio + 1);
			vm.select.material_select();
		}

		function eliminar(key) {
			CriterioService.eliminar(key)
				.then(function (result) {
					if (result) {
						listar(function () {
							if (!vm.criterios) {
								vm.switchCard();
							}
						});
						IsAlertService.showSuccess('Registro eliminado !');
					}

				});
		}

		function listar(funcao) {
			vm.listaCarregada = false;
			CriterioService.listar()
				.then(function (result) {
					vm.criterios = result;
					vm.listaCarregada = true;
					if (funcao) {
						funcao();
					}
					$scope.$apply();
				});
		}

		function switchCard() {
			vm.cardReveal = $('.card-reveal .card-title') ? $('.card-reveal .card-title') : $('.card .activator');
			vm.cardReveal.click();
		}

		function limpar() {
			vm.criterio = {};
			iniciaSelect();
		}
	}
})();