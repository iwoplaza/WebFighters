class PlayerAnimator {
	constructor(player, model) {
		this.player = player;
		this.model = model;
		
		this.walkCycle = 0;
		this.walkCycleSpeed = 2;
	}
	
	update() {
		if(this.player.moveDirection == 0) {
			this.performIdle();
		}else{
			this.performWalk();
		}
	}
	
	performIdle() {
		this.model.boneRoot.origin.y = -43;
		
		this.model.boneStomach.orientation = 10;
		this.model.boneHead.orientation = -10;
		this.model.boneLeftArm.orientation = -30;
		this.model.boneLeftForearm.orientation = -10;
		this.model.boneRightArm.orientation = 20;
		this.model.boneRightForearm.orientation = -10;

		this.model.boneLeftLeg.orientation = -20;
		this.model.boneLeftForeleg.orientation = 10;
		this.model.boneRightLeg.orientation = 10;
		this.model.boneRightForeleg.orientation = 10;
	}
	
	performWalk() {
		this.walkCycle = (this.walkCycle + Time.deltaTime * this.walkCycleSpeed)%1;
		
		this.model.boneStomach.orientation = 20;
		this.model.boneHead.orientation = -20;
		this.model.boneLeftLeg.orientation = Math.sin(this.walkCycle*Math.PI*2) * 40;
		this.model.boneRightLeg.orientation = Math.sin(this.walkCycle*Math.PI*2) * -40;
		
		this.model.boneLeftForeleg.orientation = (Math.sin(this.walkCycle*Math.PI*2 - 2)*0.5+0.5) * 80;
		this.model.boneRightForeleg.orientation = (Math.sin(this.walkCycle*Math.PI*2 + Math.PI - 2)*0.5+0.5) * 80;
		
		this.model.boneRoot.origin.y = -43 + Math.abs(Math.sin(this.walkCycle*Math.PI*2)) * -8;
		
		this.model.boneStomach.orientation = 30 + Math.abs(-Math.sin(this.walkCycle*Math.PI*2)) * -10;
		
		this.model.boneLeftArm.orientation = Math.sin(this.walkCycle*Math.PI*2) * -50;
		this.model.boneRightArm.orientation = Math.sin(this.walkCycle*Math.PI*2) * 50;
		
		this.model.boneLeftForearm.orientation = (Math.sin(this.walkCycle*Math.PI*2 + 1)*0.5+0.5) * -60;
		this.model.boneRightForearm.orientation = (Math.sin(this.walkCycle*Math.PI*2 + Math.PI + 1)*0.5+0.5) * -60;
	}
}