(function () {

	'use strict';

	angular
		.module('is', [
			'ui.router',
			'ui.grid',
			'ngAnimate',
			'ngMaterial',
			'ngMaterialSidemenu',
			'firebase',
			'LocalStorageModule',
			'toastr'
		])
		.config(function ($httpProvider) {
			$httpProvider.interceptors.push(interceptor);
		});

	var interceptor = function ($q, AuthService, $location) {
		return {
			request: function (config) {
				if (!AuthService.isUsuarioLogado()) {
					config.url = 'views/login/login.html';
					$location.path('/login')
				}
				return config;
			},

			response: function (result) {
				return result;
			},

			responseError: function (rejection) {
				if (rejection.status == 403) {
					console.log('Failed with', rejection, 'status');
				}

				return $q.reject(rejection);
			}
		}
	}
})();