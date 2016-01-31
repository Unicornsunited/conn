angular.module('gameControllers', [])
    .controller('gameController',
        function($scope, $timeout, Game, HumanPlayer, AutomatedPlayer, messageService, gameMoves) {
            var i,
                _game = new Game({
                    rowCount: 6,
                    colCount: 7,
                    winningCount: 4
                }),
                _messages = messageService.getMessages();

            // Initialise scope variables
            $scope.colIndices = [];
            $scope.rowIndices = [];

            // These scope variables are set to functions in order to capture 
            // internal changes to the properties
            $scope.currentPlayer = _game.getCurrentPlayer;
            $scope.grid = _game.getGrid;
            $scope.move = gameMoves.move;
            $scope.message = {};

            for (i = _game.colCount - 1; i >= 0; i--) {
                $scope.colIndices.unshift(i);
            }

            for (i = _game.rowCount - 1; i >= 0; i--) {
                $scope.rowIndices.push(i);
            }


            $scope.resetGame = function() {
                _game.reset();
            };

            // Setting up the game
            _game.registerPlayer(new HumanPlayer(1, {
                isUser: true
            }));
            _game.registerPlayer(new AutomatedPlayer(2));

            _game.onGameEnd(function(winningPlayer) {

                if (!winningPlayer) {
                    $scope.message = _messages["tie"];
                } else if (winningPlayer.isUser) {
                    $scope.message = _messages["youWin"];
                } else {
                    $scope.message = _messages["youLose"];
                }

            });

            _game.onIllegalMove(function(player) {

                if (player.isUser) {
                    $scope.message = _messages["cannotMove"];
                }

            });

            _game.onPlayerChange(function(player) {

                if (player) {
                    _messages["playerMove"].setMessage(player);
                    $scope.message = _messages["playerMove"];
                }

            });

            _game.start();
        }
    );
