import { instrument } from "@socket.io/admin-ui";
import { createServer } from "http";
import { Server } from "socket.io";


const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin:
            ["http://127.0.0.1:5500", "https://admin.socket.io"]
    }
});

io.on('connection', (socket) => {

    socket.on("join-room", (room, cb) => {
        socket.join(room);
        cb(`Joined ${room}`, socket.id);
    })
    socket.on("join-room-p2", (room, cb) => {
        socket.join(room);
        socket.broadcast.emit("send-id", socket.id);
        cb(`Joined ${room}`, socket.id);
    })

    socket.on("send-id", id => {
        socket.broadcast.emit("send-id2", id);
    })
});
instrument(io, { auth: false });
httpServer.listen(8000);