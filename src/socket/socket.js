import { sub } from "../db/redis.js";

export const initSocket = (io) => {
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      socket.join(`user_${userId}`);
      console.log(`User ${userId} joined room`);
    }

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  sub.subscribe("new_notification");

  sub.on("message", (channel, message) => {
   
    if (channel === "new_notification") {
      const { userId, message: msg } = JSON.parse(message);

      io.to(`user_${userId}`).emit("notify", msg);
    }
  });
};
