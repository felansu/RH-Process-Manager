(function () {

	'use strict';

	angular
		.module('is')
		.controller('AvaliadorController', AvaliadorController);

	/* @ngInject */
	function AvaliadorController() {

		var vm = this;

		vm.tituloPagina = 'Avaliador';

	}
})();