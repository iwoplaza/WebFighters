var express = require('express');
var expressApp = express();
var http = require('http');
var httpServer = http.createServer(expressApp);
var httpSocketServer = http.createServer(function(request, response) {});
var WebSocketServer = require('websocket').server;

module.exports = {
    startServer: function(callback) {
		expressApp.get('/', function(req, res) {
            res.sendFile(ROOTPATH + '/static/index.html');
        });
		expressApp.get('/controller', function(req, res) {
            res.sendFile(ROOTPATH + '/static/controller/index.html');
        });
		expressApp.get('/watch', function(req, res) {
            res.sendFile(ROOTPATH + '/static/watch/index.html');
        });
		expressApp.get('/snake', function(req, res) {
            res.sendFile(ROOTPATH + '/static/snake/index.html');
        });
        expressApp.use(express.static('./static/'));
        
        var port = process.env.PORT || 80;
        
        httpServer.listen(port, function() {
            console.log((new Date()) + ' Server is listening on port ' + port);
        });
		
		httpSocketServer.listen(5000, function() { });
		
		module.exports.io = new WebSocketServer({
            httpServer: httpSocketServer,
            autoAcceptConnections: false
        });
		
        callback();
    }
}