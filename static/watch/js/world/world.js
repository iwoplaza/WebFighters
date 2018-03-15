class World {
	constructor() {
		this.platforms = [];
	}
	
	draw() {
		ctx.fillStyle = "#222";
		ctx.fillRect(-10000, -10000, 20000, 20000);
		for(let platform of this.platforms) {
            platform.draw();
        }
	}
	
	addPlatform(platform) {
		this.platforms.push(platform);
	}
}