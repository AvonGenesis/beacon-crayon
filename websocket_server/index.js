var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis');

app.get('/', function(req, res){
  res.sendfile('beacon_crayon.html');
});

app.use(express.static('public'));

sub = redis.createClient('redis://:beacon@lotus.snax.io:6379/0');
pub = redis.createClient();
sub.on('message', function(chan, msg) {
  console.log(chan);
  console.log(msg);
  io.emit('message', msg);
});

sub.subscribe('phaser');

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
