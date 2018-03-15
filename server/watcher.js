class Watcher {
	constructor(connection) {
		this.connection = connection;
		
		this.connection.watcher = this;
	}
}

module.exports = Watcher;