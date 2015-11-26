var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: 'Ii1asTjazXQE1H07FAivozQbX',
	consumer_secret: 'VnXhnkWZ5MyeZMRObnwNIsTVUrTC34JdO2OXxwEfJmA2kLvCtF',
	access_token_key: '844543537-cuYgkC5HWDlMFPbtSGbiBpbVGvi9bvIKXD4MLXCa',
	access_token_secret: 'WrtNoS8caf8CBFgljQVj9ulYm2XqchydX05s2oD9q0IfD',
  request_options: {
    proxy: 'http://proxy.autozone.com'
  }
});

app.use(express.static(__dirname));
app.use('/bs', express.static(__dirname + '/node_modules/bootstrap/'));
app.use('/tw', express.static(__dirname + '/node_modules/twitter/lib'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// New socket connection
io.on('connection', function(socket){
  // Socket connection successful
  console.log('a user connected '+ socket.id);

  // Socket disconnection execute following function
  socket.on('disconnect', onSocketDisconnect);

  // Get tweets by user name
  socket.on('getTweets', onGetTweets);

  // Get users that are nearby
  socket.on('nearby', onGetNearby);
});

// Socket disconnected
function onSocketDisconnect () {
  console.log('Disconnected from socket server')
}

// Function to get the tweets from the user
function onGetTweets(username) {
  var params = {screen_name: username};

  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      console.log("HERE" + username);
      io.emit('getTweets', tweets);
      console.log(tweets);
    }
  });
}

// Function to get nearby users
function onGetNearby(location) {

    var params = {query : location};
    client.get('geo/search', params, function(error, nearUsers, response){
      if (!error) {
        console.log(nearUsers);
        io.emit('nearby', nearUsers);
      }
    });
    //accuracy=0&query=Toronto&granularity=neighborhood&autocomplete=false&trim_place=false
}


http.listen(process.env.PORT || 5000, function(){
  console.log('listening on *:5000');
});