const { MongoClient } = require('mongodb');
const assert = require('assert');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

const url = process.env.DB_HOST;
const dbName = 'chatapp';


async function connect() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected successfully to the MongoDB server");
        return client;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err;
    }
}

// Call the connect function to establish the connection
connect();
module.exports = { connect };