(function () {

	'use strict';

	angular
		.module('is')
		.controller('CriterioController', CriterioController);

	/* @ngInject */
	function CriterioController() {

		var vm = this;

		vm.tituloPagina = 'Criterio';

		$(document).ready(function() {
			$('select').material_select();
		});



	}
})();