const express = require('express')
const cors = require('cors')
var router = express.Router();
var db_api_controller = require('./Api/db_api');
var converter_api_controller = require('./Api/converter_api');
require('dotenv').config()

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
    res.status(200).send("Hey");
});

router.post('/intents', db_api_controller.post_intents);
router.post('/entities', db_api_controller.post_entities);
// router.post('/api/dialogs', db_api_controller.post_dialogs);
router.post('/upload-csv', converter_api_controller.post_upload_csv);

router.get('/intents', db_api_controller.get_intents);
router.get('/intents-analytics', db_api_controller.get_intents_analytics);
router.get('/intents/:name', db_api_controller.get_intents);
router.get('/entities', db_api_controller.get_entities);
router.get('/entities-analytics', db_api_controller.get_entities_analytics);
router.get('/entities/:name', db_api_controller.get_entities);
// router.get('/api/dialogs', db_api_controller.get_dialogs);
router.get('/download-md/:filename', converter_api_controller.get_download_md);

router.delete('/intents/:name', db_api_controller.remove_intent);
router.delete('/entities/:name', db_api_controller.remove_entity);

app.use('/api', router);

// all other endpoints are 404s
app.use(function (req, res, next) {
    res.status(404).send('Not found');
});

app.listen(process.env.SERVER_PORT, () => console.log('Server started on ' + process.env.SERVER_PORT));
