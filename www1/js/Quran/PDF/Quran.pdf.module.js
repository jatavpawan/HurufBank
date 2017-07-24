angular.module('Quran.pdf.module', ['Quran.pdf.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('Quran-pdf', {
        url: '/Quran-pdf',
        templateUrl: 'templates/Quran.main.html',
        controller: 'Quran.pdf.controller',
	})
});