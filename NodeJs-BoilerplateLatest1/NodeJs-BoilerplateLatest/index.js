/**
 * NPM PACKAGES
 */
const express = require('express')
var app = express();
const path = require('path');
var avenue = require('./routes/index')
var fileUpload = require('express-fileupload')
var http = require("http").Server(app);
const cors = require('cors');
var socket = module.exports = require("socket.io")(http);
var io = module.exports = require('socket.io-client')(http)

var socketController = require('./controller/socketController')

/**
 * FILE UPLOAD
 */
app.use(fileUpload({
    useTempFiles: true,
}));

/**
 * SOCKET CONNECTION
 */
socket.on('connection', (socket) => {
    socket.on("req", (data) => {
        if (data.en == "updateSocketId") {
            socketController.updateSocketId.updateSocketId(data, socket)
        }
        if (data.en == "friendList") {
            socketController.friendList
        }
        if (data.en == "userList") {

        }
        if (data.en == "chatHistory") {

        }
        if (data.en == "chat") {

        }
        if (data.en == "search") {

        }
        if (data.en == "lastSeen") {

        }
        // socket.on('disconnect', function(data) {

        // })
    })
})

/**
 * FILE READER PATH
 */
app.use(express.static('./public/upload'));
app.use(express.static(path.join(__dirname, './public')));
/**
 * ROUTING PATH
 */
var users = avenue.users

require('dotenv').config();
const PORT = process.env.port || 8080

/**
 * CORS
 */
const corsOption = {
    origin: `${process.env.hostValue}:${PORT}`
}
app.use(cors(corsOption))

/**
 * BODY PARSER
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * END-POINT
 */
app.use('/api/v1/users', users);

/**
 * APPLICATION LISTEN
 */
http.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
})