/*
    File to contain methods related to (or with) database operations that don't belong in db_api.js
*/
const db = require("../database");
const generatorHelper = require("../Actions/generators");
const analyticsHelper = require("../Actions/analytics_data_helpers");

/*
    Returns amounts of intents changed spread over the last week.
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
    res.status(200).json(analyticsHelper.formatDbData(dates));
    return;
}

/*
    Returns amounts of entities changed spread over the last week.
*/
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

/*
    Generate 100 random entities over the last week.
    Only used of testing & dev purposes.
*/
exports.generate_entities = async function (req, res) {
    const MINS_IN_WEEK = 10080;
    for (let i = 0; i < 100; i++) {
        let name = generatorHelper.uuid();
        var date1 = new Date();
        date1.setMinutes(date1.getMinutes() - generatorHelper.randomInt(MINS_IN_WEEK));
        let entity = new db.EntitiesModel({
            name: name,
            expressions: [generatorHelper.uuid(), generatorHelper.uuid(), generatorHelper.uuid()],
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

/*
    Generate 100 random entities over the last week.
    Only used of testing & dev purposes.
*/
exports.generate_intents = async function (req, res) {
    const MINS_IN_WEEK = 10080;
    for (let i = 0; i < 100; i++) {
        let name = generatorHelper.uuid();
        var date1 = new Date();
        date1.setMinutes(date1.getMinutes() - generatorHelper.randomInt(MINS_IN_WEEK));
        let intent = new db.IntentsModel({
            name: generatorHelper.uuid(),
            synonyms: {
                synonym_reference: generatorHelper.uuid(),
                list: [
                    generatorHelper.uuid(), generatorHelper.uuid(), generatorHelper.uuid(),
                ],
            },
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

/*
 Helper function to clean the database for testing purposes (run before any kinds of tests are run)
 Note: Tests are run in a different database thus data in the dev db would not be overwritten
 */
exports.clear_db = async function (done) {
    await db.EntitiesModel.deleteMany({});
    await db.IntentsModel.deleteMany({});
    done();
};
