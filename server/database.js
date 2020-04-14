/*
    Setup a database connection and define schemas and models.
*/
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('SERVER CONNECTED TO DATABASE'));

var Schema = mongoose.Schema;

var intentsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        synonyms: [
            {
                synonym_reference: { type: String, required: true },
                list: [
                    {
                        type: String,
                    },
                ],
            },
        ],
        last_updated: { type: Date, default: Date.now },
    },
);

const entitiesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    expressions: [String],
    last_updated: { type: Date, default: Date.now }
});

const IntentsModel = mongoose.model('intents', intentsSchema);
const EntitiesModel = mongoose.model('entities', entitiesSchema);

module.exports = {
    db: db,
    EntitiesModel: EntitiesModel,
    IntentsModel: IntentsModel,
}
