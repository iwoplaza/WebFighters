class PlayerAnimator {
	constructor(player, model) {
		this.player = player;
		this.model = model;
		
		this.walkCycle = 0;
		this.walkCycleSpeed = 2;
		
		this.idleCycle = 0;
		this.idleCycleSpeed = 0.4;
	}
	
	update() {
		if(!this.player.onGround) {
			this.performJump();
		}else{
			if(this.player.moveDirection == 0) {
				this.performIdle();
			}else{
				this.performWalk();
			}
		}
		
		if(this.player.weaponId != null) {
			this.performWeaponry();
		}
	}
	
	performIdle() {
		this.idleCycle = (this.idleCycle + Time.deltaTime * this.idleCycleSpeed)%1;
		let a = Math.sin(this.idleCycle*Math.PI*2)*0.5+0.5;
		
		this.model.boneRoot.origin.y = -43;
		
		this.model.boneStomach.orientation = 10 + a*10;
		this.model.boneHead.orientation = -10 - a*10;
		this.model.boneLeftArm.orientation = -30 - a*10;
		this.model.boneLeftForearm.orientation = -10;
		this.model.boneRightArm.orientation = 20 + a*10;
		this.model.boneRightForearm.orientation = -10;

		this.model.boneLeftLeg.orientation = -20 - a*10;
		this.model.boneLeftForeleg.orientation = 10 + a*10;
		this.model.boneRightLeg.orientation = 10 + a*2;
		this.model.boneRightForeleg.orientation = 10 - a*10;
	}
	
	performWalk() {
		this.walkCycle = (this.walkCycle + Time.deltaTime * this.walkCycleSpeed)%1;
		this.model.boneRoot.origin.y = -43 + Math.abs(Math.sin(this.walkCycle*Math.PI*2)) * -8;
		
		this.model.boneStomach.orientation = 20;
		this.model.boneHead.orientation = -20;
		this.model.boneLeftLeg.orientation = Math.sin(this.walkCycle*Math.PI*2) * 40;
		this.model.boneRightLeg.orientation = Math.sin(this.walkCycle*Math.PI*2) * -40;
		
		this.model.boneLeftForeleg.orientation = (Math.sin(this.walkCycle*Math.PI*2 - 2)*0.5+0.5) * 80;
		this.model.boneRightForeleg.orientation = (Math.sin(this.walkCycle*Math.PI*2 + Math.PI - 2)*0.5+0.5) * 80;
		
		this.model.boneStomach.orientation = 30 + Math.abs(-Math.sin(this.walkCycle*Math.PI*2)) * -10;
		
		this.model.boneLeftArm.orientation = Math.sin(this.walkCycle*Math.PI*2) * -50;
		this.model.boneRightArm.orientation = Math.sin(this.walkCycle*Math.PI*2) * 50;
		
		this.model.boneLeftForearm.orientation = (Math.sin(this.walkCycle*Math.PI*2 + 1)*0.5+0.5) * -60;
		this.model.boneRightForearm.orientation = (Math.sin(this.walkCycle*Math.PI*2 + Math.PI + 1)*0.5+0.5) * -60;
	}
	
	performJump() {
		let t = Math.max(-1, Math.min(this.player.velocity.y*0.0012-0.5, 1))*0.5+0.5;
		
		this.model.boneStomach.orientation = Math.lerp(5, 10, t);
		this.model.boneRoot.origin.y = -60;
		
		this.model.boneHead.orientation = Math.lerp(-10, 10, t);
		this.model.boneLeftArm.orientation = Math.lerp(-10, -90, t);
		this.model.boneLeftForearm.orientation = -10;
		this.model.boneRightArm.orientation = Math.lerp(10, 90, t);
		this.model.boneRightForearm.orientation = -10;
		this.model.boneLeftLeg.orientation = Math.lerp(-70, 0, t);
		this.model.boneLeftForeleg.orientation = Math.lerp(90, 10, t);
		this.model.boneRightLeg.orientation = Math.lerp(10, -70, t);
		this.model.boneRightForeleg.orientation = Math.lerp(10, 90, t);
	}
	
	performWeaponry() {
		let armBone = this.model.boneRightArm;
		let forearmBone = this.model.boneRightForearm;
		if(!this.player.turn) {
			armBone = this.model.boneLeftArm;
			forearmBone = this.model.boneLeftForearm;
		}
		
		armBone.orientation = -this.model.boneStomach.orientation-90;
		forearmBone.orientation = 0;
	}
}