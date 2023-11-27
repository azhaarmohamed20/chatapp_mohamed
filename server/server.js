const express = require('express')
const {chats} = require('./daten/data')
const dotenv = require("dotenv")
const cors = require('cors');
const connectDB = require('./config/db')
const multer = require('multer');
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
const messageRoutes = require('./routes/messageRoutes')

dotenv.config()
connectDB()
const app = express()
app.use(express.json()) 
app.use(cors());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads'); // Ensure 'uploads' directory exists
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.use('/api/signup', upload.single('pic'));

app.get("/", (req,res) =>{
    res.send("API is Running")
})

app.use("/api/user", userRoutes)

app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)



app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server Started on PORT ${PORT}`))

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
})

io.on("connection", (socket) =>{
  console.log("Connected to socket.io")

  socket.on('setup', (userData) => {
    socket.join(userData._id)
    console.log(userData._id)
    socket.emit("connected")	
  })


  socket.on("join chat", (room) => {
    socket.join(room)
    console.log("User Joined Room: " + room)
  })


  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat
    if(!chat.users) return console.log("chat.users not defined")

    chat.users.forEach(user => {
      if(user._id == newMessageRecieved.sender._id) return
      
      socket.in(user._id).emit("message recieved", newMessageRecieved)
    })
  })
})