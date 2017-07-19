angular.module('Quran.Video.module', ['Quran.Video.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('Quran-Video', {
        url: '/Quran-Video',
        templateUrl: 'templates/Quran.Video.html',
        controller: 'Quran.Video.controller',
	})
});