var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('user message:' + msg);
    io.emit('chat message', msg);
  });
  socket.on('wf', function(msg){
    console.log('wf message:' + msg);
    io.emit('wf', msg);
    //socket.broadcast.emit('wf', msg);
  });
  socket.on('cross', function(msg){
    console.log('cross message:' + msg);
    //io.emit('cross', msg);
    socket.broadcast.emit('cross', msg);
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});
