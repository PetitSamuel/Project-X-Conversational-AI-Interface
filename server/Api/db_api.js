/*
    Api endpoints which store or retrieve data from the database.
*/

const db = require("../database")

/*
    Post request. Params required :
        name: String (note: Name has to be stringified)
        expressions: String array.
        Response: 200 on success, body includes the new intent as a JSON object.
        Example request:
            POST Request to /api/intents
            Headers: Accept: application/json
            Body:
                {
                    "name": "test_name",
                    "expressions": [
                        "hello"
                    ]
                }
        Example response:
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

    // if intent is found, overwritte expressions to the ones from the request.
    currentIntent.expressions = params.expressions;
    currentIntent.last_updated = Date.now();
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
    Return type is an array of json objects.
    Example request:
        GET Request to /api/intents/<optional intent name>
        Headers: Accept: application/json
    Example Response:
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
        let intents = await db.IntentsModel.find(dbQueryParam);
        res.status(200).json(intents);
        return;
    } catch (err) {
        res.status(400).send({ "error": true, "message": err });
        return;
    }
}

/*
    Remove entire intent by name specified in endpoint.
    (ie a DELETE request to /api/intents/MyName will delete MyName & all of its expressions.)
    Example request:
        DELETE request to /api/intents/MyName
        Headers: Accept: application/json
    Example response:
        {
            "deleted_count": 0,
            "db_ok": true
        }
    To Note: deleted count is 0 if name is not found in db. 1 if the delete was successful.
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

/*
    Post request. Params required :
        name: String (note: Name has to be stringified)
        synonyms: Array of the following object:
            {
                synonym_reference: String
                list: [String]
            }
        Response: 200 on success, body includes the new intent as a JSON object.
        Example request:
            POST Request to /api/entities
            Headers: Accept: application/json
            Body:
                {
                    "name": "test_name",
                    "synonyms": [
                        {
                            "synonym_reference": "reference 1",
                            "list": ["first item", "second item"]
                        },
                        {
                            "synonym_reference": "reference 2",
                            "list": ["third item", "fourth item"]
                        }
                    ]
                }
        Example response:
            {
                "_id": "5e7cc9d3cebcc70008da1d46",
                "name": "test_name",
                "synonyms": [
                    {
                        "list": [
                            "first item",
                            "second item"
                        ],
                        "_id": "5e7cc9d3cebcc70008da1d47",
                        "synonym_reference": "reference 1"
                    },
                    {
                        "list": [
                            "third item",
                            "fourth item"
                        ],
                        "_id": "5e7cc9d3cebcc70008da1d48",
                        "synonym_reference": "reference 2"
                    }
                ],
                "date": "2020-03-26T15:27:15.507Z",
                "__v": 0
            }
    Note: to delete specific synonyms or items from a list of an intent,
    send a post request with the new details for that entity as it will overwrite the unwanted ones.
*/
exports.post_entities = async function (req, res) {
    let params = req.body;
    if (!params.name || !params.synonyms || params.synonyms.length === 0) {
        res.status(400).json({ "error": "Request needs a name (string), and an array with at least one synonym." })
    }
    if (!params) {
        res.status(400).json({ "error": true, "message": "empty request body." });
        return;
    }
    if (!params.name) {
        res.status(400).json({ "error": true, "message": "Request needs a name field." });
        return;
    }
    if (!params.synonyms || !Array.isArray(params.synonyms)) {
        res.status(400).json({ "error": true, "message": "Request needs a synonyms field. (Array)." });
        return;
    }

    // make sure synonyms have the correct structure
    for (const current of params.synonyms) {
        if (!current.synonym_reference || !current.list || !Array.isArray(current.list)) {
            res.status(400).json({ "error": true, "message": "Each synonym needs the following structure : {synonym_reference: String, list: [String]}." });
        }
    }

    let currentEntity = await db.EntitiesModel.findOne({ 'name': params.name });
    // If no intent found, make a new one
    if (!currentEntity) {
        let entity = new db.EntitiesModel({
            name: params.name,
            synonyms: params.synonyms,
        });

        const newEntity = await entity.save();
        if (newEntity !== entity) {
            res.status(400).json({ "error": true, "message": "Error when saving to db.", "details": newEntity });
            return;
        }
        res.status(200).json(newEntity);
        return;
    }

    // if entity is found, overwritte synonyms to the ones from the request.
    currentEntity.synonyms = params.synonyms;
    currentEntity.last_updated = Date.now();
    const updatedEntity = await currentEntity.save();
    if (updatedEntity !== currentEntity) {
        res.status(400).json({ "error": true, "message": "Error when saving to db.", "details": updatedEntity });
        return;
    }
    res.status(200).json(updatedEntity);
};


/*
    Returns list of all entities.
    If an intent name is specified in endpoint only return that one.
    Return type is an array of json objects.
    Endpoint : /api/entities/<optional entity name>.
    Example request:
        GET Request to /api/entities/<optional intent name>
        Headers: Accept: application/json
    Example response:
        [
            {
                "_id": "5e7cc9d3cebcc70008da1d46",
                "name": "test_name",
                "synonyms": [
                    {
                        "list": [
                            "first item",
                            "second item"
                        ],
                        "_id": "5e7cc9d3cebcc70008da1d47",
                        "synonym_reference": "reference 1"
                    },
                    {
                        "list": [
                            "third item",
                            "fourth item"
                        ],
                        "_id": "5e7cc9d3cebcc70008da1d48",
                        "synonym_reference": "reference 2"
                    }
                ],
                "date": "2020-03-26T15:27:15.507Z",
                "__v": 0
            }
        ]
*/
exports.get_entities = async function (req, res) {
    let dbQueryParam = {};
    let reqParams = req.params;
    if (reqParams.name) {
        dbQueryParam = { 'name': reqParams.name };
    }
    try {
        let posts = await db.EntitiesModel.find(dbQueryParam);
        res.status(200).json(posts);
        return;
    } catch (err) {
        res.status(400).send({ "error": true, "message": err });
        return;
    }
}

/*
    Remove entire entity by name specified in endpoint.
    (ie a DELETE request to /api/entity/MyName will delete MyName & all of its synonyms.)
    Example request:
        DELETE request to /api/entities/MyName
        Headers: Accept: application/json
    Example response:
        {
            "deleted_count": 0,
            "db_ok": true
        }
    To note: Deleted count is 0 if name is not found in db. 1 if the delete was successful.
*/
exports.remove_entity = async function (req, res) {
    let params = req.params;
    if (!params) {
        res.status(400).json({ "error": true, "message": "Invalid request: no parameter specified in endpoint." })
        return;
    }
    if (!params.name) {
        res.status(400).json({ "error": true, "message": "Invalid request: no entity name specified in endpoint." })
        return;
    }
    let status = await db.EntitiesModel.deleteOne({ 'name': params.name });
    res.status(200).json({ deleted_count: status.deletedCount, db_ok: status.ok === 1 });
};

/*
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
*/

exports.get_intents_analytics = async function (req, res) {
    var lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    let dbQueryParam = { "last_updated": { "$gt": lastWeek, "$lt": Date.now() } };
    try {
        var dates = await db.IntentsModel.find(dbQueryParam).select('last_updated');
    } catch (err) {
        res.status(400).send({ "error": true, "message": err });
        return;
    }
    res.status(200).json(fromDbToFromattedAnalytics(dates));
    return;
}

exports.get_entities_analytics = async function (req, res) {
    var lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    let dbQueryParam = { "last_updated": { "$gt": lastWeek, "$lt": Date.now() } };
    try {
        var dates = await db.EntitiesModel.find(dbQueryParam).select('last_updated');
    } catch (err) {
        res.status(400).send({ "error": true, "message": err });
        return;
    }
    res.status(200).json(fromDbToFromattedAnalytics(dates));
    return;
}

function fromDbToFromattedAnalytics(data) {
    if (!data) {
        return null;
    }
    let values = {
        "Monday": {
        },
        "Tuesday": {
        },
        "Wednesday": {
        },
        "Thursday": {
        },
        "Friday": {
        },
        "Saturday": {
        },
        "Sunday": {
        },
    };
    for (const date of data) {
        let parsedDate = new Date(date.last_updated);
        if (values[dayOfWeekAsString(parsedDate.getDay() - 1)][parsedDate.getHours().toString()] == null) {
            values[dayOfWeekAsString(parsedDate.getDay() - 1)][parsedDate.getHours().toString()] = 1;
        } else {
            values[dayOfWeekAsString(parsedDate.getDay() - 1)][parsedDate.getHours().toString()]++;
        }
    }
    let arr = [];
    for (const item in values) {
        for (const child in values[item]) {
            arr.push({
                name: item,
                value: child,
                count: values[item][child],
            })
        }
    }
    return arr;
}
function dayOfWeekAsString(dayIndex) {
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][dayIndex];
}
