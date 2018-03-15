var canvas, ctx;
var movePadMovement;
var movePadAttack;

function main() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    
    movePadMovement = new MovePad(0, 0, canvas.width/2, canvas.height, 0);
    movePadAttack = new MovePad(canvas.width/2, 0, canvas.width/2, canvas.height, 180);
    
    run();
}
main();

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
	
	coords.x *= canvas.width/canvas.clientWidth;
	coords.y *= canvas.height/canvas.clientHeight;
	
	console.log(canvas.scrollTop);
	
	return coords;
}

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