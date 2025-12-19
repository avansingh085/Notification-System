import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import notificationRoutes from "./routes/notification.routes.js";
import { connectDB } from "./db/connectDB.js";
import { initSocket } from "./socket/socket.js";

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.use("/notifications", notificationRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});


await connectDB();
initSocket(io);

server.listen(3000, () => {
    console.log(" Server running on port 3000");
});
