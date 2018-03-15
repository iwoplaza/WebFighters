var WebHandler;

MessageHandler = {};
MessageHandler.messageCallbacks = {
	'hello': function(connection, packet) {
		var response = {
			header: { type: 'hello' },
			text: "What's up man?"
		};
		connection.emit('message', JSON.stringify(response));
	},
	
	'join_request': function(connection, packet) {
		if(packet.name == undefined)
			return;
		if(ServerChatManager.onJoinRequest(connection, packet.name)) {
			sendInitPackage(connection);
			WebHandler.io.sockets.emit('message', JSON.stringify({
				header: { type: 'new_chatter' },
				name: packet.name
			}));
		}
	},
}

function sendInitPackage(connection) {
	var response = {
		header: { type: 'init' }
	};
	
	response.chatters = [];
	for(var i = 0; i < ServerChatManager.Chatters.list.length; ++i) {
		response.chatters.push({
			name: ServerChatManager.Chatters.list[i].name
		});
	}
	
	response.history = ServerChatManager.history;
	
	connection.emit('message', JSON.stringify(response));
}

MessageHandler.decode = function(connection, msg) {
    var header = msg.charCodeAt(0);

    if(this.messageCallbacks[header.type] != undefined) {
        this.messageCallbacks[header.type](connection, msg);
    }else{
        console.warn("Warning: Recieved a message with an unhandled message header (" + header.type + ")");
    }
}

module.exports = MessageHandler;