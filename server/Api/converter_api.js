const converter = require("../Actions/converter")
var multer = require('multer')
const path = require('path');
var fs = require('fs');

var uploadPath = path.join(__dirname + process.env.SERVER_UPLOAD_DIR);
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

var upload = multer({ storage: storage }).single('file')

exports.post_upload_csv = async function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.json({ "error": true, "message": JSON.stringify(err) });
        }
        let outputFilePath = req.file.path.substring(0, req.file.path.length - 3) + "md";
        let outputFileName = req.file.filename.substring(0, req.file.filename.length - 3) + "md";
        let val = converter.convertCsvToMd(req.file.path, outputFilePath);
        if (val === false) {
            res.status(400).json({ "error": "an error occured during file conversion." });
        }
        res.status(200).json({ "filename": outputFileName });
    });
}

exports.get_download_md = async function (req, res) {

    const file = uploadPath + "/" + req.params.filename;
    if (!file) {
        res.status(400).json({ "error": "couldn't find file in server." });
        return;
    }
    res.download(file);
}
