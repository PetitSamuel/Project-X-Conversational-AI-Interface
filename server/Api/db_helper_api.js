const db = require("../database");
const generatorHelper = require("../Actions/generators");
const analyticsHelper = require("../Actions/analytics_data_helpers");

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
    res.status(200).json(analyticsHelper.formatDbData(dates));
    return;
}

// todo : add comment here
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
    res.status(200).json(analyticsHelper.formatDbData(dates));
    return;
}

exports.generate_intents = async function (req, res) {
    const MINS_IN_WEEK = 10080;
    for (let i = 0; i < 100; i++) {
        let name = generatorHelper.uuid();
        var date1 = new Date();
        date1.setMinutes(date1.getMinutes() - generatorHelper.randomInt(MINS_IN_WEEK));
        let intent = new db.IntentsModel({
            name: name,
            expressions: [generatorHelper.uuid(), generatorHelper.uuid(), generatorHelper.uuid()],
            last_updated: date1,
        });
        const newIntent = await intent.save();
        if (newIntent !== intent) {
            res.status(400).json({ "error": true, "message": "Error when saving to db.", "details": newIntent });
            return;
        }
    }

    res.status(200).json({ "message": "populated db with intents" });
}

exports.generate_entities = async function (req, res) {
    const MINS_IN_WEEK = 10080;
    for (let i = 0; i < 100; i++) {
        let name = generatorHelper.uuid();
        var date1 = new Date();
        date1.setMinutes(date1.getMinutes() - generatorHelper.randomInt(MINS_IN_WEEK));
        let intent = new db.IntentsModel({
            name: name,
            expressions: [generatorHelper.uuid(), generatorHelper.uuid(), generatorHelper.uuid()],
            last_updated: date1,
        });
        let entity = new db.EntitiesModel({
            name: generatorHelper.uuid(),
            synonyms: {
                synonym_reference: generatorHelper.uuid(),
                list: [
                    generatorHelper.uuid(), generatorHelper.uuid(), generatorHelper.uuid(),
                ],
            },
            last_updated: date1,
        });
        const newEntity = await entity.save();
        if (newEntity !== entity) {
            res.status(400).json({ "error": true, "message": "Error when saving to db.", "details": newEntity });
            return;
        }
    }

    res.status(200).json({ "message": "populated db with entities" });
}

exports.clear_db = async function (req, res) {
    let statusEntities = await db.EntitiesModel.deleteMany({});
    let statusIntents = await db.IntentsModel.deleteMany({});
    let statusDialogs = await db.DialogModel.deleteMany({});
    res.status(200).json({"intents": statusIntents, "entities": statusEntities, "dialogs": statusDialogs});
};
