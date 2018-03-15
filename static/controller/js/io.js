IO = {};

IO.setupControls = function() {
	document.getElementById("canvas").ontouchstart = function(e) { e.preventDefault(); }
	
	document.onmousedown = function(e) {
		e.preventDefault();
		let coords = pageToCanvasCoords(e.clientX, e.clientY);
		movePadMovement.onPress(coords.x, coords.y, null);
		movePadAttack.onPress(coords.x, coords.y, null);
	};

	document.onmouseup = function(e) {
		e.preventDefault();
		let coords = pageToCanvasCoords(e.clientX, e.clientY);
		movePadMovement.onRelease(coords.x, coords.y, null);
		movePadAttack.onRelease(coords.x, coords.y, null);
	};

	document.onmousemove = function(e) {
		e.preventDefault();
		let coords = pageToCanvasCoords(e.clientX, e.clientY);
		movePadMovement.onMove(coords.x, coords.y, null);
		movePadAttack.onMove(coords.x, coords.y, null);
	};

	document.ontouchstart = function(e) {
		e.preventDefault();
		for(let touch of e.changedTouches) {
			let coords = pageToCanvasCoords(touch.clientX, touch.clientY);
			movePadMovement.onPress(coords.x, coords.y, touch);
			movePadAttack.onPress(coords.x, coords.y, touch);
		}
	};

	document.ontouchend = function(e) {
		e.preventDefault();
		for(let touch of e.changedTouches) {
			let coords = pageToCanvasCoords(touch.clientX, touch.clientY);
			movePadMovement.onRelease(coords.x, coords.y, touch);
			movePadAttack.onRelease(coords.x, coords.y, touch);
		}
	};

	document.ontouchmove = function(e) {
		e.preventDefault();
		for(let touch of e.changedTouches) {
			let coords = pageToCanvasCoords(touch.clientX, touch.clientY);
			movePadMovement.onMove(coords.x, coords.y, touch);
			movePadAttack.onMove(coords.x, coords.y, touch);
		}
	}
}