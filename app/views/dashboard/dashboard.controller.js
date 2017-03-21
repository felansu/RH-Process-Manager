(function () {

	'use strict';

	angular
		.module('is')
		.controller('DashboardController', DashboardController);

	/* @ngInject */
	function DashboardController($scope, $state, $mdSidenav, AuthService, $location, SelecaoService) {

		var vm = this;

		vm.openSideNavPanel = openSideNavPanel;
		vm.closeSideNavPanel = closeSideNavPanel;
		vm.alterarRota = alterarRota;
		vm.isUsuarioLogado = isUsuarioLogado;
		vm.signOut = signOut;
		vm.listarSelecoes = listarSelecoes;
		vm.listaSelecoes = [];

		init();

		function init() {
			AuthService.firebaseIsInitialized();
			$state.go(vm.isUsuarioLogado() ? 'dashboard' : 'login');
			listarSelecoes();
		}

		function alterarRota(state, key) {
			$state.go(state, {'key': key});
			closeSideNavPanel();
		}

		function openSideNavPanel() {
			$mdSidenav('left').open();
		}

		function closeSideNavPanel() {
			$mdSidenav('left').close();
		}

		function isUsuarioLogado() {
			return AuthService.isUsuarioLogado();
		}

		function signOut() {
			AuthService.signOut().then(function () {
				$state.go('login');
				$location.url('login');
			});
		}

		function listarSelecoes() {
			SelecaoService.listar()
				.then(function (result) {
					vm.listaSelecoes = result;
				})
		}
	}
})();