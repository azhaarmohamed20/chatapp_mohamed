const mongoose = require("mongoose");
const { Schema, model} = mongoose
const messageSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;