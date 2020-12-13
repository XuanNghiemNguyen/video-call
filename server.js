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


const shortName = () => uniqueNamesGenerator({
    dictionaries: [colors, animals]
});


const PORT = 4000;

let clients = {};

io.on('connection', (socket) => {
    const username = shortName();
    if(!Object.keys(clients).includes(username)) {
        console.log(`${username} is connected!`)
        clients[username] = socket.id;
        socket.emit("username", { username });
        io.sockets.emit("clients", clients);
    } else {
        socket.emit("user_denied:", { username });
    }

    socket.on('disconnect', () => {
        if(Object.keys(clients).includes(username)) {
            console.log(`${username} is disconnected!`)
            delete clients[username]
            io.sockets.emit("clients", clients);
        } else {
            socket.emit("user_denied:", { username });
        }
    })
})

app.get("/", (req, res) => {
    res.send("VIDEO CALL SERVER");
})
server.listen(PORT, () => {
    console.log(`server running on https://127.0.0.1:${PORT}`);
})