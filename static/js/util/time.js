Time = {};
Time.deltaTime = 0;
Time.deltaTimeCap = 0.1;
Time.lastTime = Date.now();

Time.update = function() {
    let now = Date.now();
    Time.deltaTime = Math.max(0, Math.min((now - Time.lastTime)/1000, Time.deltaTimeCap));
    Time.lastTime = now;
}

if(typeof module !== 'undefined')
	module.exports.Time = Time;