var canvas, ctx;
var game;

function main() {
    console.log('Connected to server...');
	
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    game = new Game();
    let player = new Player(0, 'Hello');
    game.addPlayer(player);
    player.location.y = 140;
    player.location.x = 90;
    
	IO.onKeyDown((e) => {
		if(e.keyCode == 32) {
			game.players[0].jumpBegin();
		}
	});
	
	IO.onKeyUp((e) => {
		if(e.keyCode == 32) {
			game.players[0].jumpStop();
		}
	});
	
    run();
}
WebHandler.init(main);

function run() {
    Time.update();
    
	ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.run();
    
    //game.players[0].model.boneStomach.orientation += Time.deltaTime;
    
	if(IO.getKeyPressed(65)) {
		game.players[0].move(-1);
	}else if(IO.getKeyPressed(68)) {
		game.players[0].move(1);
	}else{
		game.players[0].move(0);
	}
	
    requestAnimationFrame(run);
}