function GameScreen(){
    this.dir = 0;
    this.pdir = 0;
    this.ticks = 0;
    this.snake = [{x: 20,y: 15},{x: 20,y: 16},{x: 20,y: 17}];
    this.generatePoint();
    score = 0;
}

GameScreen.prototype.update = function(){
    this.ticks++;
    if (this.ticks%2 != 0) return;
    
    for (let i=1;i<this.snake.length;i++){
        if (this.snake[0].x == this.snake[i].x && this.snake[0].y == this.snake[i].y) screen = new MainScreen();
    }
    
    this.pdir = this.dir;
    if (this.dir==0) this.snake.unshift({x: this.snake[0].x, y: this.snake[0].y-1});
    else if (this.dir==1) this.snake.unshift({x: this.snake[0].x+1, y: this.snake[0].y});
    else if (this.dir==2) this.snake.unshift({x: this.snake[0].x, y: this.snake[0].y+1});
    else if (this.dir==3) this.snake.unshift({x: this.snake[0].x-1, y: this.snake[0].y});
    this.snake = this.snake.slice(0,-1);
    
    if (this.snake[0].x<0) this.snake[0].x = 39;
    if (this.snake[0].x>39) this.snake[0].x = 0;
    if (this.snake[0].y<0) this.snake[0].y = 19;
    if (this.snake[0].y>19) this.snake[0].y = 0;
    
    if (this.snake[0].x == this.point.x && this.snake[0].y == this.point.y){
        score++;
        this.snake.push(this.snake[this.snake.length-1]);
        this.generatePoint();
    }
}
GameScreen.prototype.display = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    ctx.save();
    ctx.translate(10+this.point.x*20,10+this.point.y*20);
    ctx.fillStyle = "orange";
    ctx.fillRect(-9,-9,18,18);
    ctx.restore();
    
    for (var i=this.snake.length-1;i>=0;i--){
        ctx.save();
        ctx.translate(10+this.snake[i].x*20,10+this.snake[i].y*20)
        ctx.fillStyle = i==0?"green":"black";
        ctx.fillRect(-9,-9,18,18);
        ctx.restore();
    }
}
GameScreen.prototype.touch = function(x,y){
    var angle = Math.atan2(y-(canvas.height/2),x-(canvas.width/2));
    var deg = 180*angle/Math.PI;
    deg = (360+Math.round(deg))%360;
    
    if ((deg>225 && deg<315) && this.pdir!=2) this.dir = 0;
	if ((deg>315 || deg<45) && this.pdir!=3) this.dir = 1;
	if ((deg>45 && deg<135) && this.pdir != 0) this.dir = 2;
	if ((deg>135 && deg<225) && this.pdir != 1) this.dir = 3;
}
GameScreen.prototype.generatePoint = function(){
    var a=1;
    while (a){
        a=0;
        this.point = {x: Math.floor(Math.random()*((canvas.width/20)-1)), y: Math.floor(Math.random()*((canvas.height/20)-1))};
        for (let i=0;i<this.snake.length;i++){
            if (this.point.x == this.snake[i].x && this.point.y == this.snake[i].y) a = 1;
        }
    }
}