angular.module('gameControllers', [])
    .controller('GameController', function($scope, $timeout, GameMoves) {
        var colCount = 6;
        var rowCount = 6;
        var winningCount = 4;

        $scope.colCount = colCount;
        $scope.rowCount = rowCount;
        $scope.winningCount = winningCount;

        $scope.makeMove = makeMove;
        $scope.resetGame = resetGame;

        $scope.colIndices = [];
        $scope.rowIndices = [];

        $scope.move = GameMoves.move;

        for (var i = colCount - 1; i >= 0; i--) {
            $scope.colIndices.unshift(i);
        };

        for (var i = rowCount - 1; i >= 0; i--) {
            $scope.rowIndices.push(i);
        };

        $scope.grid = [];
        $scope.colChoice = null;
        $scope.humanPlayer = 1;
        $scope.activePlayer = 1;
        $scope.message = "";

        resetGrid();

        function resetGame() {
            resetGrid();
            $scope.colChoice = null;
            $scope.activePlayer = 1;
            $scope.message = "";
        }

        function resetGrid() {
            $scope.grid = [];

            for (var i = 0; i < colCount; i++) {
                $scope.grid.push([]);
            }
        }

        function makeMove(playerId, col) {
            if (isValidMove(playerId, col)) {
                $scope.grid[col].push(playerId);

                if (checkTie()) {
                    $scope.message = "No more moves can be made. It's a tie";
                    $scope.colChoice = null;
                } else if (checkWinner(playerId)) {
                    if (playerId === 1) {
                        $scope.message = "You win!";
                    } else {
                        $scope.message = "You lose";
                    }

                    $scope.activePlayer = null;
                } else {
                    changeActivePlayer();
                    $scope.message = "";
                    $scope.colChoice = null;
                }
            } else {
                $scope.message = "Cannot make move";
                $scope.colChoice = null;
            }
        }

        function automatedMove(playerId) {
			function getRandomInt(min, max) {
			    return Math.floor(Math.random() * (max - min + 1)) + min;
			}
	
			var col = getRandomInt(0, colCount - 1);
            // let col = (max = 0, min = colCount - 1) => Math.floor(Math.random() * (max - min + 1)) + min;

            makeMove(playerId, col);

            if ($scope.message === "Cannot make move") {
                automatedMove(playerId);
            }
        }

        // Move Validation
        function isValidMove(playerId, col) {
            function isActivePlayer() {
                return playerId != null && playerId == $scope.activePlayer;
            }

            function isValidCol() {
                return col > -1 && col < colCount;
            }

            function isColNotFull() {
                return $scope.grid[col].length < rowCount;
            }

            return isActivePlayer() && isValidCol() && isColNotFull();
        }

        function changeActivePlayer() {
            if ($scope.activePlayer === 1) {
                $scope.activePlayer = 2;

                var _timer = 200 + Math.random() * 1500;

                $timeout(function() {
                        automatedMove(2);
                    },
                    _timer);
            } else if ($scope.activePlayer === 2) {
                $scope.activePlayer = 1;
            }
        }

        // Check full grid where there is no winner

        function checkTie() {
            var allFull = true;

            for (var i = 0; i < rowCount; i++) {
                allFull = allFull && $scope.grid[i].length >= rowCount;
            };

            return allFull;
        }

        // Check if move is a winning one
        function checkWinner(playerId) {
            function checkHorizontal() {
                for (var i = 0; i < rowCount; i++) {
                    var playerCount = 0;
                    for (var j = 0; j < colCount; j++) {
                        if ($scope.grid[j] && $scope.grid[j][i] === playerId) {
                            playerCount++;
                            if (playerCount === winningCount) {
                                return true;
                            }
                        } else {
                            playerCount = 0;
                        }
                    }
                }
            }

            function checkVertical() {
                for (var i = 0; i < colCount; i++) {
                    var playerCount = 0;
                    for (var j = 0; j < $scope.grid[i].length; j++) {
                        if ($scope.grid[i][j] === playerId) {
                            playerCount++;
                            if (playerCount === winningCount) {
                                return true;
                            }
                        } else {
                            playerCount = 0;
                        }
                    }
                }

                return false;
            }

            function checkDiagonalSWtoNE() {

                for (var r = 0; r < rowCount; r++) {
                    var currCol = 0;
                    var currRow = r;
                    var playerCount = 0;

                    while (currCol < colCount && currRow < rowCount) {
                        if ($scope.grid[currCol] && $scope.grid[currCol][currRow] === playerId) {
                            playerCount++;
                            if (playerCount === winningCount) {
                                return true;
                            }
                        } else {
                            playerCount = 0;
                        }

                        currRow++;
                        currCol++;
                    }
                }

                for (var c = 0; c < colCount; c++) {
                    var currCol = c;
                    var currRow = 0;
                    var playerCount = 0;

                    while (currCol < colCount && currRow < rowCount) {
                        if ($scope.grid[currCol] && $scope.grid[currCol][currRow] === playerId) {
                            playerCount++;
                            if (playerCount === winningCount) {
                                return true;
                            }
                        } else {
                            playerCount = 0;
                        }

                        currRow++;
                        currCol++;
                    }
                }

                return false;
            }

            function checkDiagonalSEtoNW() {

                for (var c = 0; c < colCount; c++) {
                    var currCol = c;
                    var currRow = 0;
                    var playerCount = 0;

                    while (currCol >= 0 && currRow < rowCount) {
                        if ($scope.grid[currCol] && $scope.grid[currCol][currRow] === playerId) {
                            playerCount++;
                            if (playerCount === winningCount) {
                                return true;
                            }
                        } else {
                            playerCount = 0;
                        }

                        currRow++;
                        currCol--;
                    }
                }

                for (var r = 0; r < rowCount; r++) {
                    var currCol = colCount - 1;
                    var currRow = r;
                    var playerCount = 0;

                    while (currCol >= 0 && currRow < rowCount) {
                        if ($scope.grid[currCol] && $scope.grid[currCol][currRow] === playerId) {
                            playerCount++;
                            if (playerCount === winningCount) {
                                return true;
                            }
                        } else {
                            playerCount = 0;
                        }

                        currRow++;
                        currCol--;
                    }
                }

                return false;
            }

            return checkHorizontal() || checkVertical() || checkDiagonalSWtoNE() || checkDiagonalSEtoNW();
        }
    })
