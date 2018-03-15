class MovePad {
    constructor(x, y, width, height, hue) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hue = hue;
        
        this.pressed = false;
        this.anchorX = 0;
        this.anchorY = 0;
		this.touchX = 0;
		this.touchY = 0;
		this.touchId = null;
    }
    
    draw() {
        let l = this.pressed ? 60 : 50;
        ctx.fillStyle = "hsl("+this.hue+", 70%, "+l+"%)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
		
		if(this.pressed) {
			ctx.fillStyle = "hsl("+this.hue+", 70%, "+(l+10)+"%)";
			ctx.beginPath();
			ctx.arc(this.anchorX, this.anchorY, 70, 0, Math.PI*2);
			ctx.fill();
			
			ctx.fillStyle = "hsl("+this.hue+", 70%, "+(l+20)+"%)";
			ctx.beginPath();
			ctx.arc(this.touchX, this.touchY, 70, 0, Math.PI*2);
			ctx.fill();
		}
    }
    
    onPress(x, y, touch) {
        if(x > this.x && x < this.x+this.width &&
           y > this.y && y < this.y+this.height) {
            this.pressed = true;
			this.touchId = touch != null ? touch.identifier : null;
			this.anchorX = x;
			this.anchorY = y;
			this.touchX = x;
			this.touchY = y;
        }
    }
    
    onRelease(x, y, touch) {
		if(this.touchId == null || this.touch == null || touch.identifier === this.touchId) {
			this.pressed = false;
			this.touchId = null;
		}
    }
	
	onMove(x, y, touch) {
		if(this.touchId == null || this.touch == null || this.touchId === touch.identifier) {
			this.touchX = x;
			this.touchY = y;
		}
	}
}