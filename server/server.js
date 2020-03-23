const express = require('express')
const cors = require('cors')
const db = require("./database")
const converter = require("./converter")
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
    res.status(200).send("Hey");
});

app.post('/api/intents', (req, res) => {
    let params = req.body;
    let insert = db.insertIntent(params);
    if (!params.name || !params.expressions || params.expressions.length === 0) {
        res.status(400).send({ "error": "Request needs a name (string), and an array with at least one expression." })
    }
    // 200 if success, if error then error message returned
    res.json({ response: insert });
});

app.get('/api/intents', async (req, res) => {
    db.IntentsModel.find({}, function (err, data) {
        if (err) res.status(400).send({"error" : true, "message": err});
        res.json(data);
      });
});

app.post('/api/convert-csv-to-md', (req, res) => {
    let params = req.body;
    if(!params.csv) {
        res.status(400).send({ "error": "Request needs csv parameter. The value must be stringified." })
    }

    let mdString = converter.convertCsvToMd(params.csv)
    res.json({ response: mdString });
});

app.listen(process.env.SERVER_PORT, () => console.log('Server started on ' + process.env.SERVER_PORT));
