class PressPad {
    constructor(x, y, width, height, hue) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hue = hue;
        
		this.pressedBefore = false;
        this.pressed = false;
		this.touchX = 0;
		this.touchY = 0;
    }
    
    draw() {
        let l = this.pressed ? 60 : 50;
        ctx.fillStyle = "hsl("+this.hue+", 70%, "+l+"%)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    onPress(x, y, touch) {
        if(x > this.x && x < this.x+this.width &&
           y > this.y && y < this.y+this.height) {
            this.pressed = true;
			this.touchX = x;
			this.touchY = y;
			
			if(this.onpressed)
				this.onpressed(this);
        }
    }
    
	onRelease(x, y, touch) {
		if(x > this.x && x < this.x+this.width &&
           y > this.y && y < this.y+this.height) {
            this.pressed = false;
			this.touchX = x;
			this.touchY = y;
			
			if(this.onreleased)
				this.onreleased(this);
        }
    }
	
	preMove() {
		this.pressed = false;
	}
	
	onMove(x, y, touch) {
		if(touch == null) {
			if(this.pressed) {
				if(!(x > this.x && x < this.x+this.width &&
				   y > this.y && y < this.y+this.height)) {
					this.pressed = false;
					if(this.onreleased)
						this.onreleased(this);
				}
			}
			return;
		}
		
		if(x > this.x && x < this.x+this.width &&
           y > this.y && y < this.y+this.height) {
            this.pressed = true;
			this.touchX = x;
			this.touchY = y;
        }
    }
	
	postMove() {
		if(this.pressedBefore && !this.pressed) {
			if(this.onreleased)
				this.onreleased(this);
		}
		
		if(!this.pressedBefore && this.pressed) {
			if(this.onpressed)
				this.onpressed(this);
		}
		
		this.pressedBefore = this.pressed;
	}
}