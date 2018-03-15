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
		if(this.onpressed)
			this.onpressed();
    }
    
	onRelease(x, y, touch) {
        if((this.touchId==null && touch==null) || (touch!=null?this.touchId === touch.identifier:false)) {
            this.pressed = false;
            this.touchId = null;
        }
		if(this.onreleased)
			this.onreleased();
    }

    onMove(x, y, touch) {
        if((this.touchId==null && touch==null) || (touch!=null?this.touchId === touch.identifier:false)) {
            this.touchX = x;
            this.touchY = y;
        }
		if(this.onmoved)
			this.onmoved();
    }
}