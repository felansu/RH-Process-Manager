(function () {

	'use strict';

	angular
		.module('is')
		.controller('AvaliadorController', AvaliadorController);

	/* @ngInject */
	function AvaliadorController(AvaliadorService) {

		var vm = this;

		vm.tituloPagina = 'Avaliador';
		vm.avaliador = {};

		vm.salvar = salvar;
		vm.limpar = limpar;

		function salvar() {
			if (AvaliadorService.salvar(vm.avaliador)) {
				vm.limpar();
			}
		}

		function limpar() {
			vm.avaliador = {};
			vm.senhaRepetida = '';
		}

	}
})();