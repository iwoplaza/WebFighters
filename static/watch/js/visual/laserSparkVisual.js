class LaserSparkVisual {
	constructor(location, direction, velocity) {
		this.location = location;
		this.direction = direction;
		
		this.velocity = velocity;
		
		this.lifetime = 0;
		this.maxLifetime = 0.1 + Math.random()*0.2;
	}
	
	update() {
		this.lifetime += Time.deltaTime;
		
		let addVel = new Vector2(Math.cos(this.direction), Math.sin(this.direction));
		let vel = this.velocity.getMultiplied(1);
		vel.addVec(addVel.getMultiplied((1 - this.lifetime / this.maxLifetime) * 600));
		
		this.location.addVec(vel.getMultiplied(Time.deltaTime));
	}
	
	draw(ctx) {
		ctx.save();
		ctx.translate(this.location.x, this.location.y);
		ctx.rotate(this.direction);
		let l = Math.floor(Math.min(100, 100-this.lifetime*400));
		let width = 20;
		let height = 10 * (1 - this.lifetime / this.maxLifetime);
		ctx.fillStyle = "hsl(0, 100%, "+l+"%)";
		ctx.fillRect(0, -height/2, width, height);
		ctx.restore();
	}
	
	isDead() {
		return this.lifetime > this.maxLifetime;
	}
}