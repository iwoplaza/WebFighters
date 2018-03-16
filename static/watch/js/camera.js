class Camera {
	constructor() {
		this.location = new Vector2(0, 0);
		this.scale = 0.3;
		this.minScale = 0.1;
		this.maxScale = 0.6;
	}
	
	applyTransform(ctx) {
		ctx.translate(canvas.width/2, canvas.height/2);
		ctx.scale(this.scale, this.scale);
		ctx.translate(this.location.x, this.location.y);
	}
	
	update(game) {
		if(game.playersAmount <= 0)
			return;
		
		let averageX = 0;
		let averageY = 0;
		
		let firstPlayer = game.getFirstPlayer();
		
		let minX = firstPlayer.location.x,
			maxX = firstPlayer.location.x,
			minY = firstPlayer.location.y,
			maxY = firstPlayer.location.y;
		let padding = 1000;
		for(let i in game.players) {
			let player = game.players[i];
			averageX += player.location.x;
			averageY += player.location.y;
			if(player.location.x < minX)
				minX = player.location.x;
			if(player.location.x > maxX)
				maxX = player.location.x;
			if(player.location.y < minY)
				minY = player.location.y;
			if(player.location.y > maxY)
				maxY = player.location.y;
		}
		minX -= padding;
		minY -= padding;
		maxX += padding;
		maxY += padding;
		averageX /= game.playersAmount;
		averageY /= game.playersAmount;
		
		let xScale = Math.max(this.minScale, Math.min(canvas.width/(maxX-minX), this.maxScale));
		let yScale = Math.max(this.minScale, Math.min(canvas.width/(maxY-minY), this.maxScale));
		this.scale = xScale < yScale ? xScale : yScale;
		
		this.location = new Vector2(-averageX, -averageY);
	}
}