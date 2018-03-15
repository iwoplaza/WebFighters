var Player = require('./player.js');
var Watcher = require('./watcher.js');

class Game {
	constructor(id) {
		this.id = id;
		this.players = [];
		this.watchers = [];
	}
	
	doesPlayerConnectionExist(connection) {
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
		if(!this.doesPlayerConnectionExist(connection)) {
			var player = new Player(connection, this.getFreePlayerId(), name);
			this.players[player.id] = player;
			connection.session.gameId = this.id;
			return player;
		}
		return null;
	}
	
	addWatcher(connection) {
		var watcher = new Watcher(connection);
		this.watchers.push(watcher);
		connection.session.gameId = this.id;
	}

	removePlayerConnection(connection) {
		for(let i in this.players) {
			if(this.players[i] && this.players[i].connection == connection) {
				console.log('Removing '+this.players[i].name+' from the game.');
				this.players[i] = undefined;
				return true;
			}
		}
		return false;
	}
	
	removeWatcherConnection(connection) {
		for(let i in this.watchers) {
			if(this.watchers[i].connection == connection) {
				console.log('Removing '+this.watchers[i].name+' from spectating.');
				this.watchers.splice(i, 1);
				return true;
			}
		}
		return false;
	}
}

module.exports = Game;