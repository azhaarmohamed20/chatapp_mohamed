const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const{ Server } =require('socket.io')
const { connect } = require('./db');
const Message = require('./model/message')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

let client
connect()
    .then((dbClient) => {
        client = dbClient;
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

io.on("connection", async (socket) =>{
    console.log(`User Connected: ${socket.id}`)
    
    if (!client) {
        client = await connect();
    }

    socket.on("join_room", (data) =>{
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message" , async (data) =>{

        const db = client.db("chatapp");
        const messagesCollection = client.db("chatapp").collection("messages");

        try{
            const newMessage = new Message({
                room: data.room,
                author: data.username,
                message: data.message,
                time: new Date().toISOString(),
                id: Date.now()
            })

            await newMessage.save()
            socket.to(data.room).emit("receive_message", data)
        } catch (error){
            console.error("Error saving message to MongoDB: ", error)
        }
    })

    socket.on("disconnect", async ()=>{
        console.log("User Disconnected", socket.id)
        if(client){
            await client.close()
            client = null
        }
    })
})

server.listen(3001, () =>{
    console.log("SERVER RUNNING")
})