module.exports = function(io) {
  io.on('conection', (socket) => {
      console.log(socket);

      var message = socket.handshake.query['message'];
      console.log(message);

      io.to(socket.io).emit('message', 'hello from server');
  })
};