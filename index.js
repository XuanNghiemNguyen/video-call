const express = require("express");
const https = require("https");
const fs = require("fs");
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const privateKey = fs.readFileSync("sslcert/private.key");
const certificate = fs.readFileSync("sslcert/mirai-chi_com.crt");
const credentials = { key: privateKey, cert: certificate };

const app = express();
const server = https.createServer(credentials, app);
const socket = require("socket.io");
const io = socket(server, {
    cors: {
        origin: '*',
    }
});

app.use(express.static("./live-fe/build"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "live-fe", "build", "index.html"));
});

const shortName = () => uniqueNamesGenerator({
    dictionaries: [colors, animals]
});
const shortRoomName = () => uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals]
});


const PORT = process.env.PORT || 3000;

let clients = {};
let rooms = {};
setInterval(() => {
    console.log("clients:", clients);
    console.log("rooms:", rooms);
}, 5000)

io.on('connection', (socket) => {
    const username = shortName();
    if (!Object.keys(clients).includes(username)) {
        console.log(`${username} is connected!`)
        clients[username] = socket.id;
        socket.emit("username", { username });
        io.sockets.emit("clients", clients);
    } else {
        socket.emit("user_denied:", { username });
    }

    socket.on('message', (data) => {
        const { username, message } = data;
        console.log(data, "nhgime")
        io.sockets.emit("message_is_coming", { username, message, time: new Date().getTime() });
    })

    socket.on('create_room', () => {
        const _roomName = shortRoomName();
        if (_roomName && !roomNames[_roomName]) {
            roomNames[_roomName] = [socket.id];
        } else {
            socket.emit("create_room_failed:", { message: "room is existed!" });
        }
    })
    socket.on('remove_room', (data) => {
        const { room_name } = data
        if (rooms[room_name]) {
            delete rooms[room_name];
        }
    })
    socket.on('disconnect', () => {
        if (Object.keys(clients).includes(username)) {
            delete clients[username]
            io.sockets.emit("clients", clients);
            console.log(`${username} is disconnected!`)
        } else {
            socket.emit("user_denied:", { username });
        }
    })
})
server.listen(PORT, () => {
    console.log(`server running on https://127.0.0.1:${PORT}`);
})