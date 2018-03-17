class PlayerModel {
    constructor() {
        let torsoHeight = 50;
        let torseWidth = 30;
        let upperArmHeight = 24;
        let upperArmWidth = 16;
        let thighHeight = 24;
        let thighWidth = 16;
        
		let shirtColor = "#951e0f";
		let pantsColor = "#1c2ca2";
		let headColor = "#a79a7d";
		
        this.boneRoot = new Dynanim.Bone(new Vector2(0, 0), null);
        this.boneStomach = new Dynanim.Bone(new Vector2(0, 0), function() {
            ctx.fillStyle = shirtColor;
            ctx.fillRect(-torseWidth/2, -torsoHeight, torseWidth, torsoHeight);
        });
        this.boneRoot.append(this.boneStomach);
        this.boneHead = new Dynanim.Bone(new Vector2(0, -torsoHeight), function() {
            ctx.fillStyle = headColor;
            ctx.fillRect(-20, -40, 40, 40);
        });
        this.boneStomach.append(this.boneHead);
        this.boneRightArm = new Dynanim.Bone(new Vector2(-torseWidth/2-2, -torsoHeight+10), function() {
            ctx.fillStyle = shirtColor;
            ctx.fillRect(-upperArmWidth/2, -10, upperArmWidth, upperArmHeight);
        });
        this.boneStomach.append(this.boneRightArm);
        this.boneLeftArm = new Dynanim.Bone(new Vector2(torseWidth/2+2, -torsoHeight+10), function() {
            ctx.fillStyle = shirtColor;
            ctx.fillRect(-upperArmWidth/2, -10, upperArmWidth, upperArmHeight);
        });
        this.boneStomach.append(this.boneLeftArm);
        
        this.boneRightForearm = new Dynanim.Bone(new Vector2(-upperArmWidth/2, upperArmHeight-10), function() {
            ctx.fillStyle = headColor;
            ctx.fillRect(0, 0, upperArmWidth, upperArmHeight);
        });
        this.boneRightArm.append(this.boneRightForearm);
        this.boneLeftForearm = new Dynanim.Bone(new Vector2(-upperArmWidth/2, upperArmHeight-10), function() {
            ctx.fillStyle = headColor;
            ctx.fillRect(0, 0, upperArmWidth, upperArmHeight);
        });
        this.boneLeftArm.append(this.boneLeftForearm);
        
        this.boneRightLeg = new Dynanim.Bone(new Vector2(-10, 0), function() {
            ctx.fillStyle = pantsColor;
            ctx.fillRect(-thighWidth/2, 0, thighWidth, thighHeight);
        });
        this.boneRoot.append(this.boneRightLeg);
        this.boneLeftLeg = new Dynanim.Bone(new Vector2(10, 0), function() {
            ctx.fillStyle = pantsColor;
            ctx.fillRect(-thighWidth/2, 0, thighWidth, thighHeight);
        });
        this.boneRoot.append(this.boneLeftLeg);
        
        this.boneRightForeleg = new Dynanim.Bone(new Vector2(thighWidth/2, thighHeight), function() {
            ctx.fillStyle = pantsColor;
            ctx.fillRect(-thighWidth, 0, thighWidth, thighHeight);
        });
        this.boneRightLeg.append(this.boneRightForeleg);
        this.boneLeftForeleg = new Dynanim.Bone(new Vector2(thighWidth/2, thighHeight), function() {
            ctx.fillStyle = pantsColor;
            ctx.fillRect(-thighWidth, 0, thighWidth, thighHeight);
        });
        this.boneLeftLeg.append(this.boneLeftForeleg);
		
		this.boneRoot.origin.y = -40;
    }
    
    draw() {
        this.boneLeftArm.draw(ctx);
        this.boneLeftForearm.draw(ctx);
        this.boneStomach.draw(ctx);
        this.boneHead.draw(ctx);
        this.boneRightArm.draw(ctx);
        this.boneRightForearm.draw(ctx);
        this.boneLeftLeg.draw(ctx);
        this.boneLeftForeleg.draw(ctx);
        this.boneRightLeg.draw(ctx);
        this.boneRightForeleg.draw(ctx);
    }
}