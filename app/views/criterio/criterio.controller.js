(function () {

	'use strict';

	angular
		.module('is')
		.controller('CriterioController', CriterioController);

	/* @ngInject */
	function CriterioController(CriterioService, $scope) {

		$(document).ready(function () {
			$('select').material_select();
		});

		var vm = this;

		vm.tituloPagina = 'Criterio';
		vm.criterio = {};
		vm.criterios = [];

		vm.salvar = salvar;
		vm.limpar = limpar;

		init();

		function init() {
			listar();
		}

		function salvar() {
			if (CriterioService.salvar(vm.criterio)) {
				vm.limpar();
			}
		}

		function listar() {
			CriterioService.listar().then(function (result) {
				vm.criterios = result;
				$scope.$apply()
			});

		}

		function limpar() {
			vm.criterio = {};
		}
	}
})();