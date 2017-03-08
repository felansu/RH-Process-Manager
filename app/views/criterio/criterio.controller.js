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
		vm.tiposCriterios = [];

		vm.salvar = salvar;
		vm.editar = editar;
		vm.eliminar = eliminar;
		vm.limpar = limpar;

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
			$('.card-reveal .card-title').click();
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
								$('.card-reveal .card-title').click();
								vm.listaCarregada = false;
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
					vm.listaCarregada = !!vm.criterios;
					if (funcao) {
						funcao();
					}
					$scope.$apply();
				});
		}

		function limpar() {
			vm.criterio = {};
			iniciaSelect();
		}
	}
})();