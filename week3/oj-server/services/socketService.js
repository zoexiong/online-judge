module.exports = function(io) {
    //get the socket when establish a connection

  io.on('connection', (socket) => {
      console.log(socket);

      //get identity or initial value (session id, problem id, etc) in message
      var message = socket.handshake.query['message'];
      console.log(message);
      //send message back to the unique socket id
      io.to(socket.id).emit('message', 'hello from server');
  })
};