var canvas, ctx;
var movePadMovement;
var movePadAttack;
var loginPrompt;

function main() {
	console.log('Connected to server...');
	
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    
    movePadMovement = new MovePad(0, 0, canvas.width/2, canvas.height, 0);
    movePadAttack = new MovePad(canvas.width/2, 0, canvas.width/2, canvas.height, 180);
    
	movePadMovement.onpressed = function() {
		WebHandler.socket.emit('message', Coder.encode({
			'action': 51
		}, Coder.Messages.PLAYER_ACTION));
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