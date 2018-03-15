var canvas, ctx;
var movePadMovement;
var movePadAttack;
var loginPrompt;

// -1 for going left, 0 staying still, 1 for going right
var movementState = 0;

function main() {
	console.log('Connected to server...');
	
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    
    movePadMovement = new MovePad(0, 0, canvas.width/2, canvas.height, 0);
    movePadAttack = new MovePad(canvas.width/2, 0, canvas.width/2, canvas.height, 180);
    
	movePadAttack.onpressed = function(pad) {
		sendPlayerAction(0);
	}
	
	movePadAttack.onreleased = function(pad) {
		sendPlayerAction(1);
	}
	
	movePadMovement.onmoved = function(pad) {
		let x = pad.getDeltaX();
		const threshold = 30;
		if(x < -threshold) {
			sendPlayerAction(2);
		}else if(x > threshold) {
			//if(movementState != 1) {
				//movementState = 1;
				sendPlayerAction(3);
			//}
		}else{
			//movementState = 0;
			sendPlayerAction(4);
		}
	}
	
	movePadMovement.onreleased = function(pad) {
		//movementState = 0;
		sendPlayerAction(4);
		console.log('Released');
	}
	
	loginPrompt = new LoginPrompt(joinGame);
	
    run();
}
WebHandler.init(main);

function joinGame(loginPrompt) {
	console.log('Trying to join as: ' + loginPrompt.elementNameInput.value);
	
	WebHandler.socket.emit('message', Coder.encode({
		'name': loginPrompt.elementNameInput.value
	}, Coder.Messages.JOIN_REQUEST));
}

function onGameJoined() {
	console.log('Joined game!');
	loginPrompt.close();
	IO.setupControls();
}

function sendPlayerAction(action) {
	WebHandler.socket.emit('message', Coder.encode({
		'action': action
	}, Coder.Messages.PLAYER_ACTION));
}

function run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    movePadMovement.draw();
    movePadAttack.draw();
    
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