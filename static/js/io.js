var IO = {};
IO.keyStates = [];
IO.eventHandlers = {
	keyDown: [],
	keyUp: []
};

IO.getKeyPressed = function(code) {
	return IO.keyStates[code] || false;
}

IO.onKeyDown = function(callback) {
	IO.eventHandlers.keyDown.push(callback);
}

IO.onKeyUp = function(callback) {
	IO.eventHandlers.keyUp.push(callback);
}

document.addEventListener('keydown', function(e) {
	let code = e.keyCode;
	IO.keyStates[code] = true;
	
	for(let handler of IO.eventHandlers.keyDown) {
		handler(e);
	}
});

document.addEventListener('keyup', function(e) {
	let code = e.keyCode;
	IO.keyStates[code] = false;
	
	for(let handler of IO.eventHandlers.keyUp) {
		handler(e);
	}
});