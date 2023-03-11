require('dotenv').config();
require('./connection');

const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');
const cors = require('cors');
const socket = require('./sockets/socket');

//Socket configuration
const http = require('http');
const {Server} = require('socket.io'); //Library from NPM
const httpServer = http.createServer(app);
const io = new Server(httpServer);
socket(io);

app.use(cors());
app.use('/', express.static(path.join(__dirname, '/public')));

httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
