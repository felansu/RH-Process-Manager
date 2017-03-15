(function () {
	'use strict';

	angular
		.module('is')
		.service('CandidatoService', CandidatoService);

	/* @ngInject */
	function CandidatoService($http) {
		var self = this;

		self.salvar = salvar;
		self.listar = listar;
		self.eliminar = eliminar;
		self.listarSexos = listarSexos;
		self.listarFormacoes = listarFormacoes;

		function salvar(candidato) {
			if (candidato.key) {
				return firebase.database()
					.ref()
					.child('candidatos/' + candidato.key)
					.set(candidato)
					.then(function () {
						return true;
					});
			} else {
				return firebase.database()
					.ref()
					.child('candidatos')
					.push(candidato)
					.then(function (result) {
						return !!result.key;
					});
			}
		}

		function eliminar(key) {
			return firebase.database()
				.ref('candidatos')
				.child(key)
				.remove()
				.then(function () {
					return true;
				});
		}

		function listar() {
			return firebase.database()
				.ref()
				.child('candidatos')
				.once('value')
				.then(function (response) {
					return response.val();
				});
		}

		function listarSexos() {
			return $http.get('views/candidato/sexos.json')
				.then(result);

			function result(response) {
				return response.data;
			}
		}

		function listarFormacoes() {
			return $http.get('views/candidato/formacoes.json')
				.then(result);

			function result(response) {
				return response.data;
			}
		}
	}
})();