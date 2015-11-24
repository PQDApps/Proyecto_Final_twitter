var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: 'Ii1asTjazXQE1H07FAivozQbX',
	consumer_secret: 'VnXhnkWZ5MyeZMRObnwNIsTVUrTC34JdO2OXxwEfJmA2kLvCtF',
	access_token_key: '844543537-cuYgkC5HWDlMFPbtSGbiBpbVGvi9bvIKXD4MLXCa',
	access_token_secret: 'WrtNoS8caf8CBFgljQVj9ulYm2XqchydX05s2oD9q0IfD'
});

var params = {screen_name: 'PedroQuiD'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});

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