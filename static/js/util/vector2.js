class Vector2 {
    constructor(x, y) {
        this.set(x, y);
    }
    
    set(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
}

if(module)
	module.exports = Vector2;