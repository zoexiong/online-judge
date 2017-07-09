var express = require('express');
var app = express();
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");
var path = require("path");

//for socket.io
var http = require('http');
var socket_io = require('socket.io');
var io = socket_io();
var socketService = require('./services/socketService.js')(io);

//Todo: username and pswd should be read from config files
mongoose.connect("mongodb://user:user@ds141082.mlab.com:41082/coj");

//add this line to handle request for all static files
app.use(express.static(path.join(__dirname, '../public')));

app.use("/", indexRouter);
app.use("/api/v1", restRouter);


//use client side router for other path
app.use(function(req, res){
    res.sendFile("index.html", { root: path.join(__dirname, '../public') })
});

// app.listen(3000, function(){
//     console.log("App listening on port 3000!")
// });

//for socket.io
var server = http.createServer(app);
io.attach(server);
server.listen(3000);

server.on('error', onError);
server.on('listening', onListening);

function onError(error){
    throw error;
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr == 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}


