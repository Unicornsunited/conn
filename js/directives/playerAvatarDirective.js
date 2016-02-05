class playerAvatar {
	constructor() {
		this.scope = {
			playerAvatar: '='
		};
		this.restrict = 'A';
		this.tempalteUrl = '';
		this.defaultPlayer = {
			face: 'default',
			body: 'square',
			color: 'default'
		}
		this.path = {
			base: "/templates/",
			face: "face/",
			body: "body/"
		}
	};

	link(scope) {
		if (scope.playerAvatar) {
			for (var i = defaultPlayer.length - 1; i >= 0; i--) {
				if (scope.playerAvatar[i]) {
					scope.playerAvatar[i] = defaultPlayer[i];
				}
			};
		} else {
			scope.playerAvatar = defaultPlayer;
		}
		
		scope.path = path;
	}
};

angular.module('player', [])
.directive('playerAvatar', playerAvatar)