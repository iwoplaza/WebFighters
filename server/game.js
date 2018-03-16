var Player = require('./player.js');
var Watcher = require('./watcher.js');
var Time = require('../static/js/util/time.js');
var World = require('./world/world.js');
var MessageHandler = require('./messageHandler.js');
var Platform = require('./world/platform.js');

class Game {
	constructor(id) {
		this.id = id;
		this.world = new World();
		this.players = [];
		this.watchers = [];
		
		this.world.addPlatform(new Platform(-900, 900, -930, 60));
		this.world.addPlatform(new Platform(-900, 900, 300, 500));
		this.world.addPlatform(new Platform(400, 1500, -220, 60));
		this.world.addPlatform(new Platform(-1500, -400, -220, 60));
	}
	
	update() {
		for(let i in this.players) {
			if(this.players[i])
				this.players[i].update(this);
		}
	}
	
	updateState() {
		MessageHandler
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