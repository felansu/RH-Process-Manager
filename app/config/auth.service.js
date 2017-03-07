(function () {

	'use strict';

	angular
		.module('is')
		.service("AuthService", AuthService);

	/* @ngInject */
	function AuthService(IsStorageService) {

		var self = this;

		self.criarUsuario = criarUsuario;
		self.signIn = signIn;
		self.signOut = signOut;
		self.isUsuarioLogado = isUsuarioLogado;
		self.verificarToken = verificarToken;

		function firebaseIsInitialized() {
			if (!firebase.apps.length) {
				conectaFirebase();
			}
		}

		function conectaFirebase() {
			var config = {
				apiKey: "AIzaSyCJLevWzCw8cChGdAe9_cuycGZ6qkpdWvU",
				authDomain: "indra-select.firebaseapp.com",
				databaseURL: "https://indra-select.firebaseio.com",
				storageBucket: "indra-select.appspot.com",
				messagingSenderId: "860954589175"
			};
			firebase.initializeApp(config);
		}

		function criarUsuario(email, senha) {
			firebaseIsInitialized();
			firebase.auth().createUserWithEmailAndPassword(email, senha).catch(function (error) {
				return error.code + ': ' + error.message;
			});
		}

		function signIn(email, senha) {
			firebaseIsInitialized();
			return firebase.auth().signInWithEmailAndPassword(email, senha)
				.then(function (firebaseUser) {
					IsStorageService.set('usuarioLogado', firebaseUser);
					console.log('Logado com sucesso: ' + firebaseUser);
					return firebaseUser;
				})
				.catch(function (error) {
					console.log(error.code + ': ' + error.message);
					return false;
				});
		}

		function signOut() {
			firebaseIsInitialized();
			return firebase.auth().signOut()
				.then(function () {
					console.log("Sessão finalizada com sucesso");
					IsStorageService.remover('usuarioLogado');
					return true;
				}, function (error) {
					return error;
				});
		}

		function isUsuarioLogado() {
			return !!IsStorageService.get('usuarioLogado');
		}

		function verificarToken() {
			firebaseIsInitialized();
			firebase.auth().currentUser.getToken(/* forceRefresh */ true).then(function (idToken) {
				console.log(idToken);
			}).catch(function (error) {
				console.log('Erro ao verificarToken');
			});
		}

	}
})();

