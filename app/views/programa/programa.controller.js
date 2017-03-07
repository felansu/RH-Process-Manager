(function () {

	'use strict';

	angular
		.module('is')
		.controller('ProgramaController', ProgramaController);

	/* @ngInject */
	function ProgramaController(ProgramaService) {

		$(document).ready(function () {
			$('select').material_select();
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
		});

		var vm = this;

		vm.tituloPagina = 'Programa';
		vm.programa = {};

		vm.salvar = salvar;
		vm.limpar = limpar;

		function salvar() {
			if (ProgramaService.salvar(vm.programa)) {
				vm.limpar();
			}
		}

		function limpar() {
			vm.programa = {};
		}
	}
})();