class Game {
    constructor() {
        this.players = [];
		this.world = new World();
		this.camera = new Camera();
		
		this.world.addPlatform(new Platform(-900, 900, 300, 500));
		this.world.addPlatform(new Platform(400, 1500, -220, 60));
		this.world.addPlatform(new Platform(-1500, -400, -220, 60));
    }
    
    addPlayer(player) {
        this.players[player.id] = player;
    }
    
    run() {
		for(let player of this.players) {
            player.update();
        }
		
		this.camera.location = new Vector2(-this.players[0].location.x, -this.players[0].location.y);
		this.camera.applyTransform(ctx);
		
        this.world.draw();
        for(let player of this.players) {
            player.draw();
        }
    }
}