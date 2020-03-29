const express = require('express')
const cors = require('cors')
var multer = require('multer')
const path = require('path');
var fs = require('fs');
const converter = require("./converter")

var router = express.Router();
var db_api_controller = require('./Routes/db_api');
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
app.use(require("body-parser").json())

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(path.join(__dirname + '/uploads'))) {
            fs.mkdirSync(path.join(__dirname + '/uploads'));
        }
        cb(null, path.join(__dirname + '/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({ storage: storage }).single('file')

app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.json({"error": true, "message": JSON.stringify(err)});
        }
        let outputFilePath = req.file.path.substring(0, req.file.path.length-3) + "md";
        let outputFileName = req.file.path.substring(0, req.file.filename.length-3) + "md";

        let val = converter.convertCsvToMd(req.file.path,outputFilePath);
        if(val === false) {
            res.status(400).json({ "error": "an error occured during file conversion."});
        }
        res.status(200).json({ "filename": outputFileName});
    });
});
app.get('/download/:filename', function(req, res){
    const file = path.join(__dirname + '/uploads') + "/" +req.params.filename;
    if(!file) {
        res.status(400).json({"error": "couldn't find file in server."});
        return;
    }
    res.download(file); // Set disposition and send it.
  });
app.get('/', (req, res) => {
    res.status(200).send("Hey");
});

router.post('/api/intents', db_api_controller.post_intents);
router.post('/api/entities', db_api_controller.post_entities);
// router.post('/api/dialogs', db_api_controller.post_dialogs);

router.get('/api/intents', db_api_controller.get_intents);
router.get('/api/intents/:name', db_api_controller.get_intents);
router.get('/api/entities', db_api_controller.get_entities);
router.get('/api/entities/:name', db_api_controller.get_entities);
// router.get('/api/dialogs', db_api_controller.get_dialogs);

router.delete('/api/intents/:name', db_api_controller.remove_intent);
router.delete('/api/entities/:name', db_api_controller.remove_entity);

app.use('/', router);

// all other endpoints are 404s
app.use(function (req, res, next) {
    res.status(404).send('Not found');
});

app.listen(process.env.SERVER_PORT, () => console.log('Server started on ' + process.env.SERVER_PORT));
