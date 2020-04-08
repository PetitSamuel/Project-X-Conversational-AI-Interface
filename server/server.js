const express = require('express')
const cors = require('cors')
const router = require('./router').router;
const dotenv = require('dotenv');

dotenv.config();
if (!process.env.SERVER_PORT ||
    !process.env.RASA_ENDPOINT ||
    !process.env.MONGO_CONNECTION_STRING ||
    !process.env.SERVER_UPLOAD_DIR) {
    console.log('Please check environment file. Missing variables');
    if (!process.env.SERVER_PORT) console.log('No port specified');
    if (!process.env.RASA_ENDPOINT) console.log('No Rasa ip specified');
    if (!process.env.MONGO_CONNECTION_STRING) console.log('No Mongo specified');
    if (!process.env.SERVER_UPLOAD_DIR) console.log('No upload directory specified');
}

const app = express()
app.use(cors());
app.use(express.json());
app.use(require("body-parser").json())
app.get('/', (req, res) => {
    res.status(200).send("Welcome");
});
app.use('/api', router);
// all other endpoints are 404s
app.use(function (req, res, next) {
    res.status(404).send('Not found');
});
app.listen(process.env.SERVER_PORT, () => console.log('Server started on ' + process.env.SERVER_PORT));

exports.app = app;
