angular.module('gameServices', [])
.factory('gameMoves', function(){
	function whoseMove(grid, colNo, rowNo) {
		if(grid[colNo][rowNo] === 1) {
			return 1;
		} else if(grid[colNo][rowNo] === 2) {
			return 2;
		}
	}

	function relativeMoves (grid, colNo, rowNo, playerNum) {
		var _class = [];
		
		if (grid[rowNo - 1] && grid[colNo][rowNo - 1] === playerNum) _class.push("connect-bottom");
		if (grid[rowNo + 1] && grid[colNo][rowNo + 1] === playerNum) _class.push("connect-top");
		if (grid[colNo - 1] && grid[colNo - 1][rowNo] === playerNum) _class.push("connect-left");
		if (grid[colNo + 1] && grid[colNo + 1][rowNo] === playerNum) _class.push("connect-right");
		if (grid[rowNo - 1] && grid[colNo - 1] && grid[colNo - 1][rowNo - 1] === playerNum) _class.push("connect-bottom-left");
		if (grid[colNo + 1] && grid[rowNo - 1] && grid[colNo + 1][rowNo - 1] === playerNum) _class.push("connect-bottom-right");
		if (grid[rowNo + 1] && grid[colNo - 1] && grid[colNo - 1][rowNo + 1] === playerNum) _class.push("connect-top-left");
		if (grid[colNo + 1] && grid[rowNo + 1] && grid[colNo + 1][rowNo + 1] === playerNum) _class.push("connect-top-right");
		
		if (_class.length) {
			_class.push("connected");
		}
		
		return _class.join(" ");
	}

	function move(grid, colNo, rowNo) {
		let _whoseMove = whoseMove(grid, colNo, rowNo),
			_relativeMove = relativeMoves(grid, colNo, rowNo, _whoseMove),
			_return = ` player-${_whoseMove}-move ${_relativeMove}`;

		return _return;
	}

	return {
		move: move
	};
})