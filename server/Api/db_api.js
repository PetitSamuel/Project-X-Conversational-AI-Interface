/*
    Api endpoints which store or retrieve data from the database.
*/

const db = require("../database");

/*
    endpoint handler for adding a new intent.
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
    if (!params.synonyms || !Array.isArray(params.synonyms) || params.synonyms.length === 0) {
        res.status(400).json({ "error": true, "message": "Request needs a synonyms field. (Array)." });
        return;
    }

    // make sure synonyms have the correct structure
    for (const current of params.synonyms) {
        if (!current.synonym_reference || !current.list || !Array.isArray(current.list)) {
            res.status(400).json({ "error": true, "message": "Each synonym needs the following structure : {synonym_reference: String, list: [String]}." });
        }
    }

    let currentIntent = await db.IntentsModel.findOne({ 'name': params.name });
    // If no intent found, make a new one
    if (!currentIntent) {
        let intent = new db.IntentsModel({
            name: params.name,
            synonyms: params.synonyms,
        });

        const newIntent = await intent.save();
        if (newIntent !== intent) {
            res.status(400).json({ "error": true, "message": "Error when saving to db.", "details": newIntent });
            return;
        }
        res.status(200).json(newIntent);
        return;
    }

    // if entity is found, overwritte synonyms to the ones from the request.
    currentIntent.synonyms = params.synonyms;
    currentIntent.last_updated = Date.now();
    const updatedIntent = await currentIntent.save();
    if (updatedIntent !== currentIntent) {
        res.status(400).json({ "error": true, "message": "Error when saving to db.", "details": updatedIntent });
        return;
    }
    res.status(200).json(updatedIntent);
};

/*
    endpoint handler for obtaining list of all intents
    or a specific handle with the endpoint /api/intents/<intent name>
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
    Remove intent from database
*/
exports.remove_intent = async function (req, res) {
    let params = req.params;
    if (!params) {
        res.status(400).json({ "error": true, "message": "Invalid request: no parameter specified in endpoint." })
        return;
    }
    if (!params.name) {
        res.status(400).json({ "error": true, "message": "Invalid request: no intent name specified in endpoint." })
        return;
    }
    let status = await db.IntentsModel.deleteOne({ 'name': params.name });
    res.status(200).json({ deleted_count: status.deletedCount, db_ok: status.ok === 1 });
};

/*
    Endpoint handler for adding a new entity in database.
*/
exports.post_entities = async function (req, res) {
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
    let currentEntity = await db.EntitiesModel.findOne({ 'name': params.name });
    // If no intent found, make a new one
    if (!currentEntity) {
        let entity = new db.EntitiesModel({
            name: params.name,
            expressions: params.expressions,
        });

        const newEntity = await entity.save();
        if (newEntity !== entity) {
            res.status(400).json({ "error": true, "message": "Error when saving to db.", "details": newEntity });
            return;
        }
        res.status(200).json(newEntity);
        return;
    }

    // if intent is found, overwritte expressions to the ones from the request.
    currentEntity.expressions = params.expressions;
    currentEntity.last_updated = Date.now();
    const updatedEntity = await currentEntity.save();
    if (updatedEntity !== currentEntity) {
        res.status(400).json({ "error": true, "message": "Error when saving to db.", "details": updatedEntity });
        return;
    }
    res.status(200).json(updatedEntity);
}

/*
    Endpoint handler for obtaining list of all entities
    or a specific handle with the endpoint /api/entities/<entities name>
*/
exports.get_entities = async function (req, res) {
    let dbQueryParam = {};
    let reqParams = req.params;
    if (reqParams.name) {
        dbQueryParam = { 'name': reqParams.name };
    }
    try {
        let entities = await db.EntitiesModel.find(dbQueryParam);
        res.status(200).json(entities);
        return;
    } catch (err) {
        res.status(400).send({ "error": true, "message": err });
        return;
    }
}

/*
    Remove entity from database
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
