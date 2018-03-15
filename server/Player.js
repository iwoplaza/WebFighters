class Player {
	constructor(connection, name) {
		this.connection = connection;
		this.name = name;
		
		connection.player = this;
	}
}

Player.list = [];

Player.doesConnectionExist = function(connection) {
	for(var i = 0; i < Player.list.length; ++i) {
		if(Player.list[i].connection == connection) {
			return true;
		}
	}
	return false;
}

Player.addPlayer = function(player) {
	if(!this.doesConnectionExist(player.connection)) {
		Player.list.push(player);
		return true;
	}
	return false;
}

Player.removeConnection = function(connection) {
	for(var i = 0; i < Player.list.length; ++i) {
		if(Player.list[i].connection == connection) {
			Player.list.splice(i, 1);
			return true;
		}
	}
	return false;
}

module.exports = Player;