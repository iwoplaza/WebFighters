var Player = require('./player.js');

class Game {
	constructor(id) {
		this.id = id;
		this.players = [];
	}
	
	doesConnectionExist(connection) {
		for(let i in this.players) {
			if(this.players[i] && this.players[i].connection == connection) {
				return true;
			}
		}
		return false;
	}

	getFreePlayerId() {
		let freeId = 0;
		while(this.players[freeId] != undefined)
			freeId++;

		return freeId;
	}

	addPlayer(connection, name) {
		if(!this.doesConnectionExist(connection)) {
			var player = new Player(connection, this.getFreePlayerId(), name);
			this.players[player.id] = player;
			connection.session.gameId = this.id;
			return player;
		}
		return null;
	}

	removeConnection(connection) {
		for(var i = 0; i < this.players.length; ++i) {
			if(this.players[i].connection == connection) {
				console.log('Removing '+this.players[i].name+' from the game.');
				this.players[i] = undefined;
				return true;
			}
		}
		return false;
	}
}

module.exports = Game;