/*
    Api endpoints which store or retrieve data from the database.
*/

const db = require("../database")

exports.post_intents = function(req, res) {
    let params = req.body;
    if (!params.name || !params.expressions || params.expressions.length === 0) {
        res.status(400).json({ "error": "Request needs a name (string), and an array with at least one expression." })
    }
    let insert = db.insertIntent(params);
    res.json({ response: insert });
};

exports.get_intents = function(req, res) {
    db.IntentsModel.find({}, function (err, data) {
        if (err) res.status(400).json({"error" : true, "message": err});
        res.json(data);
      });
}

exports.post_entities = function(req, res) {
    let params = req.body;
    if (!params.name || !params.synonyms || params.synonyms.length === 0) {
        res.status(400).json({ "error": "Request needs a name (string), and an array with at least one synonym." })
    }
    let insert = db.insertEntity(params);
    res.json({ response: insert });
};

exports.get_entities = function(req, res) {
    db.EntitiesModel.find({}, function (err, data) {
        if (err) res.status(400).json({"error" : true, "message": err});
        res.json(data);
      });
};

exports.post_dialogs = function(req, res) {
    let params = req.body;
    if (!params.name || !params.intent || !params.intent.name || !params.intent.responses || params.intent.responses.length === 0) {
        res.status(400).json({ "error": "Request needs a name (string), and an intent which contains a name & an array of responses." })
    }
    let insert = db.insertDialog(params);
    res.json({ response: insert });
};

exports.get_dialogs = function(req, res) {
    db.DialogModel.find({}, function (err, data) {
        if (err) res.status(400).json({"error" : true, "message": err});
        res.json(data);
      });
};
