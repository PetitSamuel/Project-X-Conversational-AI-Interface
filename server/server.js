const express = require('express')
const cors = require('cors')
const db = require("./database")
require('dotenv').config()

if (!process.env.SERVER_PORT ||
    !process.env.RASA_ENDPOINT ||
    !process.env.MONGO_CONNECTION_STRING) {
    console.log('Please check environment file. Missing variables');
    if (!process.env.SERVER_PORT) console.log('No port specified');
    if (!process.env.RASA_ENDPOINT) console.log('No Rasa ip specified');
    if (!process.env.MONGO_CONNECTION_STRING) console.log('No Mongo specified');
}

const app = express()
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Hey there");
});

app.post('/api/intent', (req, res) => {
    let params = req.body;
    let insert = db.insertIntent(params);
    if (!params.name || !params.expressions || params.expressions.length === 0) {
        res.status(400).send({ "error": "Request needs a name (string), and an array with at least one expression." })
    }
    // 200 if success, if error then error message returned
    res.json({ response: insert });
});

app.listen(process.env.SERVER_PORT, () => console.log('Server started on ' + process.env.SERVER_PORT));
