angular.module('Quran.Audio.module', ['Quran.Audio.module.controller']).config(function ($stateProvider) {

    $stateProvider.state('Quran-Audio', {
        url: '/Quran-Audio',
        templateUrl: 'templates/Quran.Audio.html',
        controller: 'Quran.Audio.controller',
	})
});