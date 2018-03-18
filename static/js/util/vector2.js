class Vector2 {
    constructor(x, y) {
        this.set(x, y);
    }
    
    set(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
	
	addVec(vec) {
		this.x += vec.x;
		this.y += vec.y;
	}
	
	multiply(x, y) {
		y = y || x;
		this.x *= x;
		this.y *= y;
	}
	
	getMultiplied(x, y) {
		y = y || x;
		return new Vector2(this.x * x, this.y * y);
	}
}

if(typeof module !== 'undefined')
	module.exports = Vector2;