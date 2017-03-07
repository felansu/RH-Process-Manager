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
		vm.limpar = limpar;


		init();

		function init() {
			$(document).ready(function () {
					$('.datepicker').pickadate({
							format: 'dd/mm/yyyy',
							clear: 'Limpar',
							close: 'Fechar',
							labelMonthNext: 'Mês seguinte',
							labelMonthPrev: 'Mês anterior',
							labelMonthSelect: 'Selecione um mês',
							labelYearSelect: 'Selecione um ano',
							monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
							monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
							today: 'Hoje',
							weekdaysFull: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
							weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
							weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
							selectMonths: true,
							selectYears: 15
						}
					);
					$('select').material_select();
				}
			);
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