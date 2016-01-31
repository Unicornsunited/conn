angular.module('app', [
	'ui.router',
	'gameControllers',
	'gameServices'
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
		controller: 'gameController'
	});
})