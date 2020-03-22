const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
    console.log('SERVER CONNECTED TO DATABASE');
});

var Schema = mongoose.Schema;

var intentsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    expressions: [{ expression: String }],
});

const entitiesSchema = new Schema(
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
        date: { type: Date, default: Date.now },
    },
);

const dialogSchema = new Schema({
    name: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    intent: {
        name: {
            name: String,
            uid: { type: String, unique: true },
        },
        responses: [
            {
                condition: String,
                output: [String],
                outputType: String,
                uid: String,
            },
        ],
    },
});

const EntitiesModel = mongoose.model('entities', entitiesSchema);
const IntentsModel = mongoose.model('intents', intentsSchema);
const DialogModel = mongoose.model('dialog', dialogSchema);

/*
To insert into db: 

// new instance
var awesome_instance = new IntentsModel({
    name: 'awesome', expressions: [
        { expression: "hey" }, { expression: "another" }
    ]
});

// save to db
awesome_instance.save(function (err, data) {
    if (err) return console.error(err);
    console.log("cool");
});
*/
module.exports = {
    db: db,
    EntitiesModel: EntitiesModel,
    IntentsModel: IntentsModel,
    DialogModel: DialogModel,
}