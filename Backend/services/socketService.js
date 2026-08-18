const { Server } = require('socket.io');

let io = null;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.io]: Client connected ID: ${socket.id}`);

    // Join room (e.g. 'devotees', 'admins', 'slot_0900')
    socket.on('join_room', (room) => {
      socket.join(room);
      console.log(`[Socket.io]: Socket ${socket.id} joined room: ${room}`);
    });

    // Handle SOS broadcast from client
    socket.on('trigger_sos', (data) => {
      console.log('[Socket.io]: Emergency SOS Received:', data);
      io.to('admins').emit('emergency_alert', {
        type: 'sos',
        data,
        timestamp: new Date(),
      });
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.io]: Client disconnected ID: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io has not been initialized!');
  }
  return io;
};

// Helper methods to emit real-time events
const notifyQueueUpdate = (data) => {
  if (io) {
    io.emit('queue_update', data);
  }
};

const broadcastSOSAlert = (alertData) => {
  if (io) {
    io.to('admins').emit('emergency_alert', alertData);
    io.emit('public_sos_notification', {
      alertId: alertData._id,
      type: alertData.type,
      location: alertData.location,
    });
  }
};

module.exports = {
  initSocket,
  getIO,
  notifyQueueUpdate,
  broadcastSOSAlert,
};
