var screen;
var canvas;
var ctx;
var score = 0;

function main(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    screen = new MainScreen();
    
    setInterval(run,100);
}

function run(){
    screen.update();
    screen.display();
}
document.getElementById("canvas").onmousedown = document.getElementById("canvas").ontouchstart = function(e){
    e.preventDefault();
    console.log(e);
    e = e || window.event;
	let x = e.pageX-(canvas.getBoundingClientRect().left);
	let y = e.pageY-(canvas.getBoundingClientRect().top);
    if (e.changedTouches)
        for(let touch of e.changedTouches) {
            console.log(touch);
            //let coords = pageToCanvasCoords(touch.clientX, touch.clientY);
            x = touch.pageX-(canvas.getBoundingClientRect().left) || x;
            y = touch.pageY-(canvas.getBoundingClientRect().top) || y;
        }
    console.log(x,y);
    screen.touch(x,y);
}
document.getElementById("canvas").ontouchmove = function(e){
    e.preventDefault();
}
document.getElementById("canvas").ontouchend = function(e){
    e.preventDefault();
}
function loadTexture(path) {
	var _texture = document.createElement('img');
	_texture.src = path;
	return _texture;
}
main();