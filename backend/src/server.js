const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const { getLocalIp } = require("./utils/networkHelper");
const eventRoutes = require("./modules/events/routes/eventRoutes");
const videoRoutes = require("./modules/videos/routes/videoRoutes");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(express.json());
app.use(
    "/storage",
    express.static("storage")
);
app.use("/events", eventRoutes);
app.use("/videos", videoRoutes);

const PORT = 3000;
const LOCAL_IP = getLocalIp();
global.LOCAL_IP = LOCAL_IP;
global.IO = io;

app.get("/", (req, res) => {
    res.json({
        message: "MF360 backend running"
    });
});

app.get("/health", (req, res) => {

    return res.json({
        success: true,
        status: "online"
    });

});

server.listen(PORT, "0.0.0.0", () => {

    console.log(`
=================================
MF360 SERVER RUNNING 
=================================

Local IP:
http://${LOCAL_IP}:${PORT}

=================================
    `);

});