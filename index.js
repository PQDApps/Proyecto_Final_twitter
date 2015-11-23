var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use('/bs', express.static(__dirname + '/node_modules/bootstrap/'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// New socket connection
io.on('connection', function(socket){
  // Socket connection successful
  console.log('a user connected '+ socket.id);
});



http.listen(process.env.PORT || 5000, function(){
  console.log('listening on *:5000');
});