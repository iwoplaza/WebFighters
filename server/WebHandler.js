var express = require('express');
var expressApp = express();
var http = require('http').createServer(expressApp);
var io = require('socket.io')(http);

module.exports = {
    startServer: function(callback) {
		expressApp.get('/controller', function(req, res) {
            res.sendFile(ROOTPATH + '/static/controller/index.html');
        });
		expressApp.get('/watch', function(req, res) {
            res.sendFile(ROOTPATH + '/static/index.html');
        });
        expressApp.use(express.static('./static/'));
        
        var port = process.env.PORT || 5000;
        
        http.listen(port, function() {
            console.log((new Date()) + ' Server is listening on port ' + port);
        });
		
        this.io = io;
		
        callback();
    }
}