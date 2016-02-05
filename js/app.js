angular.module('app', [
	'ui.router',
	'gameControllers',
	'gameServices',
	'player'
]).config(function($stateProvider, $urlRouterProvider) {
	
	let _templatePath = "templates/";

	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state('app', {
        url: "/",
        abstract: true,
        templateUrl: `${_templatePath}layout.html`
    })
	.state('app.game', {
		url: "",
		views: {
			'content@': {
				templateUrl: `${_templatePath}game.html`,
				controller: 'gameController'
			}
		}
	});
})