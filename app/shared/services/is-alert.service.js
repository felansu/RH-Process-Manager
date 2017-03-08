(function () {
	'use strict';

	angular.module('is')
		.service('IsAlertService', IsAlertService);

	function IsAlertService(toastr) {

		var self = this;

		self.showSuccess = showSuccess;
		self.showError = showError;
		self.showInfo = showInfo;

		function showSuccess(mensagem, titulo) {
			toastr.success(mensagem, titulo || 'Sucesso');
		}

		function showError(mensagem, titulo) {
			toastr.error(mensagem, titulo || 'Erro');
		}

		function showInfo(mensagem, titulo) {
			toastr.info(mensagem, titulo || 'Informação');
		}
	}

})();

