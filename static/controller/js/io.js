IO = {};

IO.setupControls = function() {
	document.getElementById("canvas").ontouchstart = function(e) { e.preventDefault(); }
	
	document.onmousedown = function(e) {
		e.preventDefault();
		let coords = pageToCanvasCoords(e.clientX, e.clientY);
		padMoveLeft.onPress(coords.x, coords.y, null);
		padMoveRight.onPress(coords.x, coords.y, null);
		padJump.onPress(coords.x, coords.y, null);
		padAttack.onPress(coords.x, coords.y, null);
	};

	document.onmouseup = function(e) {
		e.preventDefault();
		let coords = pageToCanvasCoords(e.clientX, e.clientY);
		padMoveLeft.onRelease(coords.x, coords.y, null);
		padMoveRight.onRelease(coords.x, coords.y, null);
		padJump.onRelease(coords.x, coords.y, null);
		padAttack.onRelease(coords.x, coords.y, null);
	};

	document.onmousemove = function(e) {
		e.preventDefault();
		let coords = pageToCanvasCoords(e.clientX, e.clientY);
		padMoveLeft.onMove(coords.x, coords.y, null);
		padMoveRight.onMove(coords.x, coords.y, null);
		padJump.onMove(coords.x, coords.y, null);
		padAttack.onMove(coords.x, coords.y, null);
	};

	document.ontouchstart = function(e) {
		e.preventDefault();
		for(let touch of e.changedTouches) {
			let coords = pageToCanvasCoords(touch.clientX, touch.clientY);
			padMoveLeft.onPress(coords.x, coords.y, touch);
			padMoveRight.onPress(coords.x, coords.y, touch);
			padJump.onPress(coords.x, coords.y, touch);
			padAttack.onPress(coords.x, coords.y, touch);
		}
	};

	document.ontouchend = function(e) {
		e.preventDefault();
		for(let touch of e.changedTouches) {
			let coords = pageToCanvasCoords(touch.clientX, touch.clientY);
			padMoveLeft.onRelease(coords.x, coords.y, touch);
			padMoveRight.onRelease(coords.x, coords.y, touch);
			padJump.onRelease(coords.x, coords.y, touch);
			padAttack.onRelease(coords.x, coords.y, touch);
		}
	};

	document.ontouchmove = function(e) {
		e.preventDefault();
		padMoveLeft.preMove();
		padMoveRight.preMove();
		padJump.preMove();
		padAttack.preMove();
		for(let touch of e.changedTouches) {
			let coords = pageToCanvasCoords(touch.clientX, touch.clientY);
			padMoveLeft.onMove(coords.x, coords.y, touch);
			padMoveRight.onMove(coords.x, coords.y, touch);
			padJump.onMove(coords.x, coords.y, touch);
			padAttack.onMove(coords.x, coords.y, touch);
		}
		padMoveLeft.postMove();
		padMoveRight.postMove();
		padJump.postMove();
		padAttack.postMove();
	}
}