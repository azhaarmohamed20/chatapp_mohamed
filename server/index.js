const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const{ Server } =require('socket.io')
const { connect } = require('./db');

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", async (socket) =>{
    console.log(`User Connected: ${socket.id}`)
    
    await connect();

    socket.on("join_room", (data) =>{
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message" , (data) =>{
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", async ()=>{
        console.log("User Disconnected", socket.id)
        await client.close();
    })
})

server.listen(3001, () =>{
    console.log("SERVER RUNNING")
})
