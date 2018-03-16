class World {
	constructor() {
		this.platforms = [];
	}
	
	addPlatform(platform) {
		this.platforms.push(platform);
	}
}

module.exports = World;