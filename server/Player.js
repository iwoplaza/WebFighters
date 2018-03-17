var Vector2 = require("./../static/js/util/vector2.js");
var Time = require("./../static/js/util/time.js");

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
		this.onGroundBefore = false;
		this.onGround = false;
		
		this.movementSpeed = 30000;
		this.maxVelocityX = 700;
		this.gravity = 70;
	}
	
	update(game) {
		this.velocity.x += this.moveDirection * this.movementSpeed * Time.deltaTime;
		this.velocity.x *= 0.75;
		
		this.velocity.y += this.gravity;
		
		// Collision ///////////////////
		this.onGroundBefore = this.onGround;
		this.onGround = false;
		
		for(let platform of game.world.platforms) {
			let isInBounds = this.location.x-20 <= platform.maxX && this.location.x+20 >= platform.minX;
			if(isInBounds && this.location.y <= platform.y && this.location.y + this.velocity.y*Time.deltaTime >= platform.y) {
				this.location.y = platform.y;
				this.velocity.y = 0;
				if(!this.onGroundBefore) {
					this.onLanded();
				}
				this.onGround = true;
			}
		}
		////////////////////////////////
		
		if(this.location.y > 1000) {
			this.location.x = 0;
			this.location.y = 0;
			this.velocity.y = 0;
		}
		
		this.location.x += this.velocity.x * Time.deltaTime;
		this.location.y += this.velocity.y * Time.deltaTime;
	}
	
	// Moves by the amount <-1, 1>
	move(amount) {
		this.moveDirection = amount;
		this.turn = amount > 0 ? true : amount < 0 ? false : this.turn;
	}
	
	onLanded() {
		this.doubleJumped = false;
	}
	
	// Makes the player jump
	jumpBegin() {
		if(this.onGround){
			if(!this.jumping) {
				this.jumping = true;
				this.velocity.y = -2000;
			}
		}else{
			this.doubleJump();
		}
	}
	
	jumpStop() {
		this.jumping = false;
		this.jumpCooldown = 0;
	}
	
	doubleJump() {
		if(this.doubleJumped == false) {
			this.doubleJumped = true;
			this.velocity.y = -1700;
		}
	}
	
	attack() {
		console.log("Attacking");
		let knockback = 1000;
		this.velocity.x += this.turn ? -knockback : knockback;
	}
}

module.exports = Player;