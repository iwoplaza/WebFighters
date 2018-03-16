class Game {
    constructor() {
        this.players = [];
		this.playersAmount = 0;
		this.world = new World();
		this.camera = new Camera();
    }
    
    addPlayer(player) {
		if(this.players[player.id] == undefined)
			this.playersAmount++;
        this.players[player.id] = player;
		return player;
    }
	
	removePlayer(player) {
		if(this.players[player.id] != undefined)
			this.playersAmount--;
		this.players[player.id] = undefined;
	}
    
	getFirstPlayer() {
		for(let i in this.players) {
			if(this.players[i])
            	return this.players[i];
        }
	}
	
    run() {
		for(let i in this.players) {
			if(this.players[i])
            	this.players[i].update();
        }
		
		this.camera.update(this);
		this.camera.applyTransform(ctx);
		
        this.world.draw();
        for(let i in this.players) {
			if(this.players[i])
            	this.players[i].draw();
        }
    }
}