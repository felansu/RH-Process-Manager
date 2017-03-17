(function () {
	'use strict';

	angular
		.module('is')
		.filter('isRangeFilter', isRangeFilter);

	function isRangeFilter() {
		return filterNameFilter;

		function filterNameFilter(input, total) {
			total = parseInt(total);

			for (var i = 1; i < total + 1; i++) {
				input.push(i);
			}

			return input;
		}
	}

})();

