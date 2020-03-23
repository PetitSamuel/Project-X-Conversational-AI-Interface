const converter = require("../converter")

exports.convert_csv_to_md = function(req, res) {
    let params = req.body;
    if(!params.csv) {
        res.status(400).send({ "error": "Request needs csv parameter. The value must be stringified." })
    }

    let mdString = converter.convertCsvToMd(params.csv)
    res.json({ response: mdString });
};
