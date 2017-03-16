(function () {
	'use strict';

	angular
		.module('is')
		.directive('isSelectMulti', isSelectMulti);

	/* @ngInject */
	function isSelectMulti() {
		var directive = {
			restrict: 'E',
			require: '^form',
			templateUrl: 'shared/directives/isSelectMulti/is-select-multi.template.html',
			link: link,
			scope: {
				label: '@',
				largura: '@',
				icone: '@',
				tamanhoIcone: '@',
				mensagem: '@',
				show: '@',
				keyAsValue: '=',
				lista: '=',
				ngModel: '=',
				function: '=',
				ngRequired: '=',
				control: '=',
				ngMultiple: '='
			}
		};
		return directive;

		function link($scope, element, attrs, formCtrl) {
			$scope.formCtrl = formCtrl;
			$scope.selectName = 'isSelect' + $scope.$id;
			$scope.selectControl = $scope.control || {};
			$scope.largura = $scope.largura ? $scope.largura : '12';
			$scope.tamanhoIcone = $scope.tamanhoIcone ? $scope.tamanhoIcone : '48';
			var lista = $scope.lista ? $scope.lista : [];

			if (typeof $scope.function === 'function') {
				$scope.function().then(function (result) {
					lista = result;
				});
			}

			$scope.getLista = function () {
				return lista;
			};
		}
	}

})();

