(function () {
	'use strict';

	angular
		.module('is')
		.config(config);

	/* @ngInject */
	function config($stateProvider) {

		const other = {
			name: 'other',
			url: '/',
			templateUrl: 'views/login/login.html',
			controller: 'LoginController',
			controllerAs: 'vm'
		};

		const login = {
			name: 'login',
			url: '/login',
			templateUrl: 'views/login/login.html',
			controller: 'LoginController',
			controllerAs: 'vm'
		};

		const dashboard = {
			name: 'dashboard',
			url: '/dashboard',
			templateUrl: 'views/dashboard/dashboard.html',
			controller: 'DashboardController',
			controllerAs: 'vm'
		};

		const avaliador = {
			name: 'avaliador',
			url: '/avaliador',
			templateUrl: 'views/avaliador/avaliador.html',
			controller: 'AvaliadorController',
			controllerAs: 'vm'
		};

		const criterio = {
			name: 'criterio',
			url: '/criterio',
			templateUrl: 'views/criterio/criterio.html',
			controller: 'CriterioController',
			controllerAs: 'vm'
		};

		const candidato = {
			name: 'candidato',
			url: '/candidato',
			templateUrl: 'views/candidato/candidato.html',
			controller: 'CandidatoController',
			controllerAs: 'vm'
		};

		const programa = {
			name: 'programa',
			url: '/programa',
			templateUrl: 'views/programa/programa.html',
			controller: 'ProgramaController',
			controllerAs: 'vm'
		};

		const selecao = {
			name: 'selecao',
			url: '/selecao',
			templateUrl: 'views/selecao/selecao.html',
			controller: 'SelecaoController',
			controllerAs: 'vm'
		};

		$stateProvider
			.state('other', other)
			.state('login', login)
			.state('dashboard', dashboard)
			.state('avaliador', avaliador)
			.state('criterio', criterio)
			.state('candidato', candidato)
			.state('programa', programa)
			.state('selecao', selecao);
	}

})();