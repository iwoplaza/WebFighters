var canvas, ctx;
var padMoveLeft;
var padMoveRight;
var padAttack;
var padJump;
var loginPrompt;

// -1 for going left, 0 staying still, 1 for going right
var jumpState = 0;

function main() {
	console.log('Connected to server...');
	
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    
    padMoveLeft = new PressPad(0, 0, canvas.width/4, canvas.height, 0);
    padMoveRight = new PressPad(canvas.width/4, 0, canvas.width/4, canvas.height, 50);
	padJump = new PressPad(canvas.width/2, 0, canvas.width/2, canvas.height/2, 180);
    padAttack = new PressPad(canvas.width/2, canvas.height/2, canvas.width/2, canvas.height/2, 210);
    
	padJump.onpressed = function(pad) {
		sendPlayerAction(0);
	}
	
	padJump.onreleased = function(pad) {
		sendPlayerAction(1);
	}
	
	padMoveLeft.onpressed = function(pad) {
		sendPlayerAction(2);
	}
	
	padMoveRight.onpressed = function(pad) {
		sendPlayerAction(3);
	}
	
	padMoveLeft.onreleased = function(pad) {
		if(!padMoveRight.pressed)
			sendPlayerAction(4);
	}
	
	padMoveRight.onreleased = function(pad) {
		if(!padMoveLeft.pressed)
			sendPlayerAction(4);
	}
	
	padAttack.onpressed = function(pad) {
		sendPlayerAction(5);
	}
	
	loginPrompt = new LoginPrompt(joinGame);
	
    run();
}
WebHandler.init(main);

function joinGame(loginPrompt) {
	console.log('Trying to join as: ' + loginPrompt.elementNameInput.value);
	
	MessageHandler.send(Coder.encode({
		'name': loginPrompt.elementNameInput.value
	}, Coder.Messages.JOIN_REQUEST));
}

function onGameJoined() {
	console.log('Joined game!');
	loginPrompt.close();
	IO.setupControls();
}

function sendPlayerAction(action) {
	MessageHandler.send(Coder.encode({
		'action': action
	}, Coder.Messages.PLAYER_ACTION));
}

function run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    padMoveLeft.draw();
	padMoveRight.draw();
    padJump.draw();
    padAttack.draw();
    
    requestAnimationFrame(run);
}

function pageToCanvasCoords(x, y) {
	let bounds = canvas.getBoundingClientRect();
	let coords = {
		x: x - bounds.left,
		y: y - bounds.top
	};
	
	coords.y += document.body.scrollTop;
	coords.x *= canvas.width / canvas.clientWidth;
	coords.y *= canvas.height / canvas.clientHeight;
	
	return coords;
}