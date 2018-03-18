class VisualSystem {
	constructor() {
		this.visuals = [];
	}
	
	update() {
		for(let i = this.visuals.length-1; i >= 0; --i) {
			this.visuals[i].update();
			if(this.visuals[i].isDead())
				this.visuals.splice(i, 1);
		}
	}
	
	draw(ctx) {
		for(let visual of this.visuals) {
			visual.draw(ctx);
		}
	}
	
	addVisual(visual) {
		this.visuals.push(visual);
	}
}