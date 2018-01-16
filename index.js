var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var addressLights = 0x10;
var addressDoor = 0x20;
var addressDay = 0x30;

//var i2c=require('i2c');
//var wireLights = new i2c(addressLights, {device: '/dev/i2c-1'});
//var wireDoor = new i2c(addressDoor, {device: '/dev/i2c-1'});
//var wireDay = new i2c(addressDay, {device: '/dev/i2c-1'});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

io.on('connection', function(socket){
  socket.on('switch light', function(ledNumber, actionNr){
    console.log('Switch LED number: ' + ledNumber);
    console.log('actionNr', actionNr);
    //wireLights.writeBytes(21, [ledNumber, actionNr], function(err) {});
  });
  socket.on('toggle door', function(garageNr, actionNr){
    console.log('Open door nr: ' + garageNr);
    console.log('actionNr', actionNr);
    //wireDoor.writeBytes(21, [garageNr, actionNr], function(err) {});
  });

  socket.on('toggle day', function(dayState, actionNr){
    console.log('Day nr: ' + dayState);
    console.log('actionNr', actionNr);
    //wireDay.writeBytes(21, [dayState, actionNr], function(err) {});
  });
});

http.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
