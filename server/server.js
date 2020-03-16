const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

if (!process.env.SERVER_PORT ||
    !process.env.RASA_ENDPOINT ||
    !process.env.MONGO_CONNECTION_STRING) {
    console.log('Please check environment file. Missing variables');
    if (!process.env.SERVER_PORT) logger.error('No port specified');
    if (!process.env.RASA_ENDPOINT) logger.error('No Rasa ip specified');
    if (!process.env.MONGO_CONNECTION_STRING) logger.error('No Mongo specified');
}

const app = express()
app.use(cors());
let dbStatus = false;

mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
    console.log('SERVER CONNECTED TO DATABASE');
    dbStatus = true;
});

app.get('/', (req, res) => {
    res.status(200).send("Database connection status : " + dbStatus);
});

app.listen(process.env.SERVER_PORT, () => console.log('Server started on ' + process.env.SERVER_PORT));