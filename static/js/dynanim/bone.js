Dynanim.Bone = class {
    constructor(origin, drawCallback) {
        this.origin = origin;
        this.orientation = 0;
        this.children = [];
        this.parent = null;
        this.drawCallback = drawCallback;
    }
    
    append(bone) {
        this.children.push(bone);
        bone.parent = this;
    }
    
    applySelfTransform(ctx) {
        ctx.translate(this.origin.x, this.origin.y);
        ctx.rotate(this.orientation/180*Math.PI);
    }
    
    applyTransform(ctx) {
        if(this.parent)
            this.parent.applyTransform(ctx);
        this.applySelfTransform(ctx);
    }
    
    draw(ctx) {
        ctx.save();
        this.applyTransform(ctx);
        if(this.drawCallback)
            this.drawCallback.call(this);
        ctx.restore();
    }
};