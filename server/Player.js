var Vector2 = require("./../static/js/util/vector2.js");

class Player {
	constructor(connection, id, name) {
		this.connection = connection;
		this.id = id;
		this.name = name;
		connection.session.player = this;
		
		this.location = new Vector2(Math.random()*40, 0);
		this.velocity = new Vector2();
		this.moveDirection = 0;
		this.doubleJumped = false;
		this.jumping = false;
		this.turn = false;
		this.onGround = false;
		
		this.movementSpeed = 30000;
		this.maxVelocityX = 700;
		this.gravity = 70;
	}
}

module.exports = Player;