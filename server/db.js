const { MongoClient } = require('mongodb');
const assert = require('assert');
require('dotenv').config();

const url = process.env.DB_HOST;
const dbName = 'chatapp';

const client = new MongoClient(url);

async function connect() {
    try {
        await client.connect();
        console.log("Connected successfully to the MongoDB server");

        const db = client.db(dbName);

        // Perform operations with the database here

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    } finally {
        // Close the connection when you're done with it
        await client.close();
    }
}

// Call the connect function to establish the connection
connect();
module.exports = { connect };