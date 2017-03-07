(function () {

	'use strict';

	angular
		.module('is')
		.controller('DashboardController', DashboardController);

	/* @ngInject */
	function DashboardController($state, $mdSidenav, AuthService, $location) {

		var vm = this;

		vm.openSideNavPanel = openSideNavPanel;
		vm.closeSideNavPanel = closeSideNavPanel;
		vm.alterarRota = alterarRota;
		vm.isUsuarioLogado = isUsuarioLogado;
		vm.signOut = signOut;

		init();

		function init() {
			$state.go(vm.isUsuarioLogado() ? 'dashboard' : 'login');
		}

		function alterarRota(state) {
			$state.go(state);
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
	}
})();