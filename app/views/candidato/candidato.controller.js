(function () {

	'use strict';

	angular
		.module('is')
		.controller('CandidatoController', CandidatoController);

	/* @ngInject */
	function CandidatoController(CandidatoService) {

		var vm = this;

		vm.titulo = 'Candidato';
		vm.candidato = {};

		vm.salvar = salvar;
		vm.listarSexos = listarSexos;
		vm.listarFormacoes = listarFormacoes;
		vm.limpar = limpar;

		function listarSexos() {
			return ['Masculino', 'Feminino'];
		}

		function listarFormacoes() {
			return ['Formação', 'Segundo Grau', 'Graduação', 'Pós graduação', 'Mestrado'];
		}

		function salvar() {
			if (CandidatoService.salvar(vm.candidato)) {
				vm.limpar();
			}
		}

		function limpar() {
			vm.candidato = {};
		}

	}
})
();