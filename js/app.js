angular.module('app', [
	'ui.router',
	'gameServices',
	'gameControllers'
]).config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state('app', {
        url: "/",
        abstract: true,
        templateUrl: "templates/layout.html"
    })
	.state('app.game', {
		url: "",
		templateUrl: "templates/game.html",
		controller: 'GameController'
	});
})