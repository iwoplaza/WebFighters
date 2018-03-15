var Chatters = require("./Chatter.js");

var ServerChatManager = {};
ServerChatManager.Chatters = Chatters;
ServerChatManager.history = [];

ServerChatManager.onJoinRequest = function(connection, name) {
	if(!Chatters.addChatter(new Chatters.Chatter(connection, name))) {
		console.log("The name is already taken!");
		return false;
	}
	console.log(name + " has joined the room.");
	return true;
}

ServerChatManager.removeConnection = function(connection) {
	if(Chatters.removeConnection(connection)) {
		console.log(connection.chatter.name + " left the room.");
	}
}

ServerChatManager.onNewMessage = function(name, text) {
	ServerChatManager.history.push({
		name: name,
		text: text
	});
	
	if(ServerChatManager.history.length > 20)
		ServerChatManager.history.splice(0, 1);
}

module.exports = ServerChatManager;