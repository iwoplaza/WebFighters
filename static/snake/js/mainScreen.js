function MainScreen(){
}

MainScreen.prototype.update = function(){
}
MainScreen.prototype.display = function(){
    ctx.save();
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.fillStyle = "orange";
    ctx.fillRect(-400,-50,800,100);
    ctx.font="20px custom";
    ctx.textAlign = "center";
	ctx.fillStyle = "Black";
	ctx.fillText("Tap to play!",0,0);
	ctx.fillText("Your score is "+score,0,25);
    ctx.restore();
}
MainScreen.prototype.touch = function(x,y){
    screen = new GameScreen();
}