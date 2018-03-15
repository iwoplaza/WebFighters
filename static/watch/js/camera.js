class Camera {
	constructor() {
		this.location = new Vector2(0, 0);
		this.scale = 0.3;
	}
	
	applyTransform(ctx) {
		ctx.translate(canvas.width/2, canvas.height/2);
		ctx.scale(this.scale, this.scale);
		ctx.translate(this.location.x, this.location.y);
	}
	
	update(game) {
		if(!game.players[0])
			return;
		this.location = new Vector2(-game.players[0].location.x, -game.players[0].location.y);
	}
}