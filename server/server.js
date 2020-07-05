/*******************************************************************************
 * Name: Kyle Enchill                                                          *
 * Date: 7/2/2020                                                              *
 * Version: 1.0.0                                                              *
 * Description: This file is the backend for the video sharing portion of the  *
 * application. It uses express, node.js, and socket.io. Current setup allows  *
 * for 2 users to chat and should work on all browsers.                        *
 ******************************************************************************/
const express = require('express')
const app = express()
const http = require('http') Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

app.use(express.static(__dirname + "/public")) //public is the front end folder

let clients = 0
io.on('connection', function(socket){
    socket.on("NewClient", function(){
        if(clients < 2) {
            if( clients == 1){
                this.emit('CreatePeer')
            } else {
                this.emit('SessionActive')
            }
            clients++;
        }
    })
    socket.on('Offer', SendOffer)
    socket.on('Answer', SendAnswer)
    socket.on('disconnect', Disconnect)
})

//Disconnects user when they leave the call/link
function Disconnect(){
    if(clients > 0)
        this.broadcast.emit("Disconnect")
    clients--
}

//Sends data to the other user trying to enter the call
function SendOffer(offer){
    this.broadcast.emit("BackOffer", offer)
}

function SendAnswer(data){
    this.broadcast.emit("BackAnswer", data)
}

http.listen(port, () => console.log(`Active on ${port} port`))
