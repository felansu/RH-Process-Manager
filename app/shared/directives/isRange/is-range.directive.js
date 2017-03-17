(function () {
	'use strict';

	angular
		.module('is')
		.directive('isRange', isRange);

	/* @ngInject */
	function isRange() {
		var directive = {
			restrict: 'E',
			templateUrl: 'shared/directives/isRange/is-range.template.html',
			link: link,
			scope: {
				label: '@',
				largura: '@',
				icone: '@',
				minimo: '@',
				maximo: '@',
				ngModel: '=',
				ngRequired: '='
			}
		};
		return directive;

		function link($scope, element, attrs, formCtrl) {
			$scope.selectName = 'isRange' + $scope.$id;
			$scope.selectControl = $scope.control || {};
			$scope.largura = $scope.largura ? $scope.largura : '12';
			$scope.minimo = $scope.minimo ? $scope.minimo : '0';
			$scope.maximo = $scope.maximo ? $scope.maximo : '100';
		}
	}

})();

