(function () {
	'use strict';

	angular
		.module('is')
		.controller('LoginController', LoginController);

	/* @ngInject */
	function LoginController(AuthService, $state) {
		var vm = this;

		vm.signIn = signIn;
		vm.signOut = signOut;

		function signIn() {
			AuthService.signIn(vm.usuario, vm.senha)
				.then(function (firebaseUser) {
					if (firebaseUser.email) {
						console.log('Logado com sucesso: ' + firebaseUser);
						$state.go('dashboard');
					}
				})
				.catch(function (error) {
					return error.code + ': ' + error.message;
				});
		}

		function signOut() {
			AuthService.signOut();
		}

	}
})();