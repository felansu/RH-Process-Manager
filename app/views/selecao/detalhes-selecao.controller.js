(function () {

	'use strict';

	angular
		.module('is')
		.controller('DetalhesSelecaoController', DetalhesSelecaoController);

	/* @ngInject */
	function DetalhesSelecaoController(SelecaoService, IsAlertService, $stateParams, $scope) {

		var vm = this;

		vm.tituloPagina = 'Detalhes Seleção';

		vm.selecao = {};
		vm.labels = [];
		vm.notas = [];
		vm.candidatos = [];
		vm.mapaNotas = [];

		vm.removerCandidatoDoGrafico = removerCandidatoDoGrafico;

		init();

		function init() {
			var key = $stateParams.key;
			if (key) {
				SelecaoService.getByKey(key)
					.then(function (result) {
						vm.selecao = result;
						$scope.$applyAsync();
						montaGrafico();
					});
			} else {
				IsAlertService.showError("Sem dados")
			}
		}

		function montaGrafico() {
			var labels = [];
			var notas = [];
			var nomeCandidatos = [];

			for (var i = 0; i < vm.selecao.criterios.length; i++) {
				var criterio = vm.selecao.criterios[i];
				labels.push(criterio.descricao);
				for (var j = 0; j < criterio.nota.length; j++) {
					var nota = criterio.nota[j];
					var nomeCandidato = nota.candidato.nome;

					if (!notas[nomeCandidato]) {
						notas[nomeCandidato] = [];
					}
					if (i === 0) {
						nomeCandidatos.push(nomeCandidato);
					}
					notas[nomeCandidato].push(nota.nota);
				}
			}
			vm.notas = Object.values(notas);
			var media = [];
			for (var i = 0; i < vm.notas.length; i++) {
				media[i] = vm.notas[i].reduce(function (a, b) {
					return parseInt(a) + parseInt(b)
				});
				media[i] = media[i] / labels.length;
				vm.mapaNotas.push(nomeCandidatos[i] + " (" + media[i].toFixed(2) + "%) ")

			}
			vm.candidatos = vm.mapaNotas;
			vm.labels = labels;
		}

		vm.options = {
			legend: {
				display: true,
				position: 'right'
			},
			elements: {
				line: {
					tension: 0
				},
				point: {
					hoverRadius: 6
				}
			}

		};

		function removerCandidatoDoGrafico() {
			vm.candidatos.splice(1, 1);
		}
	}
})();