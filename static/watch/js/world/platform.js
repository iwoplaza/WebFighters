class Platform {
	constructor(minX, maxX, y, height) {
		this.minX = minX;
		this.maxX = maxX;
		this.y = y;
		this.height = height;
	}
	
	draw() {
		ctx.fillStyle = "#aaa";
		ctx.fillRect(this.minX, this.y, this.maxX-this.minX, this.height);
	}
}