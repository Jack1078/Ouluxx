/*******************************************************************************
 * Name: Kyle Enchill                                                          *
 * Date: 7/2/2020                                                              *
 * Version: 1.0.0                                                              *
 * Description: This file is the backend for the video sharing portion of the  *
 * application. It uses express, node.js, and socket.io. Current setup allows  *
 * for 2 users to chat and should work on all browsers.                        *
 ******************************************************************************/
require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const users = {};

const socketToRoom = {};

io.on('connection', socket => {
    socket.on("join room", roomID => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', {
            signal: payload.signal,
            callerID: payload.callerID
        });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', {
            signal: payload.signal,
            id: socket.id
        });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));