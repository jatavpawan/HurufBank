angular.module('Quran.main.module', ['Quran.main.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('Quran-main', {
        url: '/Quran-main',
        templateUrl: 'templates/Quran.main.html',
        controller: 'Quran.main.controller',
	})
});