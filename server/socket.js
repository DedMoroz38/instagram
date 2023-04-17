const Socket = require('./controllers/socketController');
const { authorizeUser } = require("./controllers/socketController");


module.exports = function(io) {
  io.use(authorizeUser);

  io.on('connect', socket => {
    
    socket.on('dm', (message) => {
        Socket.dm(socket, message)
    });

    socket.on('fm', (messageId) => {
      Socket.fileMessage(socket, messageId);
    });

    socket.on('disconnect', () => {
        Socket.onDisconnect(socket)
    });
  });
};
