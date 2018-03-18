class LaserBeamVisual {
	constructor(location, direction) {
		this.location = location;
		this.direction = direction;
		this.lifetime = 0;
		this.maxLifetime = 0.2;
	}
	
	update() {
		this.lifetime += Time.deltaTime;
	}
	
	draw(ctx) {
		ctx.save();
		ctx.translate(this.location.x, this.location.y);
		let l = Math.floor(Math.min(100, 100-this.lifetime*400));
		let m = this.direction ? 1 : -1;
		let width = 800 * m;
		let offset = (400 * (this.lifetime / this.maxLifetime)) * m;
		let height = 10 * (1 - this.lifetime / this.maxLifetime);
		ctx.fillStyle = "hsl(0, 100%, "+l+"%)";
		ctx.fillRect(offset, -height/2, width, height);
		ctx.restore();
	}
	
	isDead() {
		return this.lifetime > this.maxLifetime;
	}
}