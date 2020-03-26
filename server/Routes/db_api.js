/*
    Api endpoints which store or retrieve data from the database.
*/

const db = require("../database")

/*
    Post request. Params required :
        name : String (note: Name has to be stringified)
        expressions: String array.
        Response: 200 on success, body includes the new intent as a JSON object.
        Example :
        {
            "expressions": [
                "hello"
            ],
            "_id": "5e7cc18f5c14b30009de5865",
            "name": "test_name",
            "__v": 0
        }
    Note: to delete specific expressions of an intent, send a post request with the new list of expressions.
*/
exports.post_intents = async function (req, res) {
    let params = req.body;
    if (!params) {
        res.status(400).json({ "error": true, "message": "empty request body." });
        return;
    }
    if (!params.name) {
        res.status(400).json({ "error": true, "message": "Request needs a name field." });
        return;
    }
    if (!params.expressions || !Array.isArray(params.expressions)) {
        res.status(400).json({ "error": true, "message": "Request needs an expressions field. (Array of Strings)." });
        return;
    }
    let currentIntent = await db.IntentsModel.findOne({ 'name': params.name });
    // If no intent found, make a new one
    if (!currentIntent) {
        let intent = new db.IntentsModel({
            name: params.name,
            expressions: params.expressions,
        });

        const newIntent = await intent.save();
        if (newIntent !== intent) {
            res.status(400).json({ "error": true, "message": "Error when saving to db.", "details": newIntent });
            return;
        }
        res.status(200).json(newIntent);
        return;
    }

    // if intent is found, overwritte expressions to currently existing intent.
    currentIntent.expressions = params.expressions;
    const updatedIntent = await currentIntent.save();
    if (updatedIntent !== currentIntent) {
        res.status(400).json({ "error": true, "message": "Error when saving to db.", "details": updatedIntent });
        return;
    }
    res.status(200).json(updatedIntent);
};

/*
    Returns list of all intents.
    If an intent name is specified only return that one.
    Return type is an array of json objects:
    Example:
    [
        {
            "expressions": [
                "test",
                "same",
                "hey"
            ],
            "_id": "5e7c9e7fbbad2f0008825fda",
            "name": "sam",
            "__v": 2
        }
    ]
*/
exports.get_intents = async function (req, res) {
    let dbQueryParam = {};
    let reqParams = req.params;
    if (reqParams.name) {
        dbQueryParam = { 'name': reqParams.name };
    }
    try {
        let posts = await db.IntentsModel.find(dbQueryParam);
        res.status(200).json(posts);
        return;
    } catch (err) {
        res.status(400).send({ "error": true, "message": err });
        return;
    }
}

/*
    Remove entire intent by name specified in endpoint (ie a DELETE request to /api/intents/MyName will delete MyName & all of its expressions.)
    Returns the following json object: 
    {
    "deleted_count": 0,
    "db_ok": true
    }
    deleted count is 0 if name is not found in db. 1 if the delete was successful.
*/
exports.remove_intent = async function (req, res) {
    let params = req.params;
    if (!params) {
        res.status(400).json({ "error": true, "message": "Invalid request: Body is empty." })
        return;
    }
    if (!params.name) {
        res.status(400).json({ "error": true, "message": "name is a required parameter." })
        return;
    }

    let status = await db.IntentsModel.deleteOne({ 'name': params.name });
    res.status(200).json({ deleted_count: status.deletedCount, db_ok: status.ok === 1 });
};

exports.post_entities = function (req, res) {
    let params = req.body;
    if (!params.name || !params.synonyms || params.synonyms.length === 0) {
        res.status(400).json({ "error": "Request needs a name (string), and an array with at least one synonym." })
    }
    let insert = db.insertEntity(params);
    res.json({ response: insert });
};

exports.get_entities = function (req, res) {
    db.EntitiesModel.find({}, function (err, data) {
        if (err) res.status(400).json({ "error": true, "message": err });
        res.json(data);
    });
};

exports.post_dialogs = function (req, res) {
    let params = req.body;
    if (!params.name || !params.intent || !params.intent.name || !params.intent.responses || params.intent.responses.length === 0) {
        res.status(400).json({ "error": "Request needs a name (string), and an intent which contains a name & an array of responses." })
    }
    let insert = db.insertDialog(params);
    res.json({ response: insert });
};

exports.get_dialogs = function (req, res) {
    db.DialogModel.find({}, function (err, data) {
        if (err) res.status(400).json({ "error": true, "message": err });
        res.json(data);
    });
};
