class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.model = new PlayerModel();
		this.animator = new PlayerAnimator(this, this.model);
        
        this.location = new Vector2();
		this.velocity = new Vector2();
		this.moveDirection = 0;
		this.doubleJumped = false;
		this.jumping = false;
		this.turn = true;
		this.onGround = false;
		
		this.movementSpeed = 30000;
		this.maxVelocityX = 700;
		this.gravity = 70;
    }
    
	update() {
		this.velocity.x += this.moveDirection * this.movementSpeed * Time.deltaTime;
		this.velocity.x *= 0.75;
		
		this.velocity.y += this.gravity;
		
		// Collision ///////////////////
		this.onGround = false;
		
		for(let platform of game.world.platforms) {
			let isInBounds = this.location.x-20 <= platform.maxX && this.location.x+20 >= platform.minX;
			if(isInBounds && this.location.y <= platform.y && this.location.y + this.velocity.y*Time.deltaTime >= platform.y) {
				this.location.y = platform.y;
				this.velocity.y = 0;
				this.onGround = true;
			}
		}
		
		////////////////////////////////
		
		this.location.x += this.velocity.x * Time.deltaTime;
		this.location.y += this.velocity.y * Time.deltaTime;
		
		this.animator.update();
	}
	
    draw() {
        ctx.save();
        ctx.translate(this.location.x, this.location.y);
		
		ctx.save();
        ctx.scale(this.turn ? 1 : -1, 1);
        this.model.draw();
        ctx.restore();
		
		ctx.font = "70px Arial";
		ctx.fillStyle = "#fff";
		ctx.textAlign = "center";
		ctx.fillText(this.name, 0, -200);
		
        ctx.restore();
    }
	
	// Moves by the amount <-1, 1>
	move(amount) {
		this.moveDirection = amount;
		this.turn = amount > 0 ? true : amount < 0 ? false : this.turn;
	}
	
	// Makes the player jump
	jumpBegin() {
		if(this.onGround){
			if(!this.jumping) {
				this.jumping = true;
				this.doubleJumped = false;
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
}