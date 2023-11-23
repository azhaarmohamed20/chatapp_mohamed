const mongoose = require('mongoose')
require('dotenv').config();


const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.DB_HOST)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit()
    }
}

module.exports = connectDB