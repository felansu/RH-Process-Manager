(function () {
	'use strict';

	angular
		.module('is')
		.directive('isInputText', isInputText);

	/* @ngInject */
	function isInputText() {
		var directive = {
			restrict: 'E',
			require: '^form',
			templateUrl: 'shared/directives/isInputText/is-input-text.template.html',
			link: link,
			scope: {
				label: '@',
				largura: '@',
				icone: '@',
				tamanho: '@',
				ngModel: '=',
				ngRequired: '='
			}
		};
		return directive;

		function link($scope, element, attrs, formCtrl) {
			$scope.formCtrl = formCtrl;
			$scope.inputName = 'isInputText' + $scope.$id;
		}
	}

})();