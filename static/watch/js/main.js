var canvas, ctx;
var game;

function main() {
    console.log('Connected to server...');
	
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    game = new Game();
    
	/*IO.onKeyDown((e) => {
		if(e.keyCode == 32) {
			game.players[0].jumpBegin();
		}
	});
	
	IO.onKeyUp((e) => {
		if(e.keyCode == 32) {
			game.players[0].jumpStop();
		}
	});*/
	
	requestSpectating();
	
    run();
}
WebHandler.init(main);

function requestSpectating() {
	MessageHandler.send(Coder.encode({'t': 0}, Coder.Messages.WATCH_REQUEST));
}

function startSpectating(msg) {
	console.log('Spectating...');
	console.dir(msg);
}

function run() {
    Time.update();
    
	ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.run();
	
	/*if(IO.getKeyPressed(65)) {
		game.players[0].move(-1);
	}else if(IO.getKeyPressed(68)) {
		game.players[0].move(1);
	}else{
		game.players[0].move(0);
	}*/
	
    requestAnimationFrame(run);
}