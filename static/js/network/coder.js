var Coder = {};
Coder.masks = [];

Coder.buff = new ArrayBuffer(8);
Coder.f64 = new Float64Array(Coder.buff);
Coder.u16 = new Uint16Array(Coder.buff);

Coder.encode = function (_object, _maskId) {
    let mask = _maskId ? _maskId : this.guessMask(_object);
    if (mask == null){
        console.error("Error on encoding!", _object);
        return "";
    }
    
    let _table = this.serialize(this.masks[mask],_object);
    let output = String.fromCharCode(mask);
    for(let i = 0; i < _table.length; i++){
        if(typeof(_table[i])=="string"){
            output += String.fromCharCode(_table[i].length+1)+_table[i];
        }else{
            output += (String.fromCharCode(this.u16.length|0x8000));
            if(typeof(_table[i]) == "number") this.f64[0] = _table[i];
            else this.f64[0] = undefined;
            for(let i = 0;i < this.u16.length; i++){
                output += String.fromCharCode(this.u16[i]);
            }
        }
    }
    return output + String.fromCharCode(0);
}

Coder.decode = function(_string) {
    let output = [];
    while (_string.length > 0){
        output.push([_string.substr(0, 1).charCodeAt(0),[]]);
        _string = _string.substr(1);
        while (_string.length>0){
            let len = _string.substr(0, 1).charCodeAt(0)&0x7fff;
            if (len<=0){
                _string = _string.substr(1);
                break;
            }
            let type = _string.substr(0,1).charCodeAt(0)&0x8000;
            type>>=15;
            if (type==1){
                for (let i=0;i<this.u16.length;i++){
                    this.u16[i] = _string.charCodeAt(1+i);
                }
                output[output.length-1][1].push(this.f64[0]);
            }else{
                len--;
                let tmp = "";
                for (var i=0;i<len;i++){
                    tmp+=_string[i+1];
                }
                output[output.length-1][1].push(tmp);
            }
            _string = _string.substr(len+1);
        }
    }
    for (let i=0;i<output.length;i++){
        output[i] = this.unserialize(this.masks[output[i][0]],output[i][1]);
    }
    return output;
}

Coder.serialize = function(_mask,_object) {
    let output = [];
    for (var i=0;i<_mask.length;i++){
        output[i] = _object[_mask[i]];
    }
    return output;
}

Coder.unserialize = function(_mask,_table) {
    let output = {};
    for (var i=0;i<_mask.length;i++){
        output[_mask[i]] = _table[i];
    }
    return output;
}

Coder.addMask = function(id, mask) {
    this.masks[id] = mask;
}

Coder.guessMask = function(_object) {
    let mask = null;
    for (let i in this.masks){
        for (let j = 0; j < this.masks[i].length; ++j){
            if (this.masks[i][j] in _object){
                if (j == this.masks[i].length-1) mask = i;
            }else{
                break;
            }
        }
    }
    return mask;
}

Coder.Messages = {
	JOIN_REQUEST: 0,
	JOIN_RESPONSE: 1,
	WATCH_REQUEST: 2,
	WATCH_INIT: 3,
	PLAYER_INIT: 4,
	PLAYER_INIT_PLAYER: 5,
	PLAYER_UPDATE: 6,
	PLAYER_UPDATE_PLAYER: 7,
	PLAYER_ACTION: 10,
	PLAYER_ACTION_UPDATE: 11
};

Coder.addMask(Coder.Messages.JOIN_REQUEST, ["name"]);
Coder.addMask(Coder.Messages.JOIN_RESPONSE, ["response"]);
Coder.addMask(Coder.Messages.WATCH_REQUEST, ["t"]);
Coder.addMask(Coder.Messages.WATCH_INIT, ["time"]);
Coder.addMask(Coder.Messages.PLAYER_DATA_INIT, ["id", "name", "x", "y"]);
Coder.addMask(Coder.Messages.PLAYER_DATA_UPDATE, ["id", "x", "y", "velX", "velY"]);
Coder.addMask(Coder.Messages.PLAYER_UPDATE, ["time"]);
Coder.addMask(Coder.Messages.PLAYER_ACTION, ["action"]);
Coder.addMask(Coder.Messages.PLAYER_ACTION_UPDATE, ["player", "action"]);

if(typeof module !== 'undefined')
	module.exports = Coder;