const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiAsPromised = require('chai-as-promised');

const app = require('../../server').app;
const db_helper = require("../../Api/db_helper_api");
const db = require("../../database");
const assert = require('chai').assert;
const should = chai.should();
const expect = chai.expect();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe("Entities", () => {
  // Called once before each of the tests in this block.
  before(function (done) {
    db_helper.clear_db(done);
  });

  const ENTITY_2_SYNONYMS = {
    'name': 'test_name',
    'synonyms': [
      {
        'synonym_reference': 'ref1_test',
        'list': [
          'val_1', 'val_2'
        ],
      },
      {
        'synonym_reference': 'ref2_test',
        'list': [
          'val_3'
        ],
      },
    ],
  };
  const ENTITY_2_SYNONYMS_2 = {
    'name': 'test_name_2',
    'synonyms': [
      {
        'synonym_reference': 'ref3_test',
        'list': [
          'val_4', 'val_5'
        ],
      },
      {
        'synonym_reference': 'ref4_test',
        'list': [
          'val_6'
        ],
      },
    ],
  };
  const ENTITY_1_SYNONYM = {
    'name': 'test_name_3',
    'synonyms': [
      {
        'synonym_reference': 'ref4_test',
        'list': [
          'val_7'
        ],
      },
    ],
  };

  const ENTITY_1_SYNONYM_DIFFERENT_SYNONYMS = {
    'name': 'test_name_3',
    'synonyms': [
      {
        'synonym_reference': 'another ref',
        'list': [
          'val_7', 'added values', 'test'
        ],
      },
    ],
  };
  it("Entities should be empty", done => {
    db.EntitiesModel.countDocuments({}).should.eventually.equal(0, "Expected number of entities in db to be 0 (cleaned before tests)").notify(done);
  });

  it("posting new entity works", function (done) {
    chai
      .request(app)
      .post("/api/entities")
      .send(ENTITY_2_SYNONYMS)
      .end((err, res) => {
        if (err) done(err)
        const body = res.body;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");

        // mongoose generates a unique id to every item, the id is returned in the object
        // we don't want to check that ids match (they wont as they are generated in the backend)
        for (const synonym of body.synonyms)
          delete synonym._id;

        assert.equal(body.name, ENTITY_2_SYNONYMS.name, "Returned name doesn't match sent name");
        assert.deepEqual(body.synonyms, ENTITY_2_SYNONYMS.synonyms, "Returned entity synonyms doesn't match sent ones.");
        db.EntitiesModel.countDocuments({}).should.eventually.equal(1, "Expected number of entities in db to be 1").notify(done);
      });
  });

  it("adding more entities", function (done) {
    chai
      .request(app)
      .post("/api/entities")
      .send(ENTITY_2_SYNONYMS_2)
      .end((err, res) => {
        if (err) done(err)
        res.should.have.status(200);
        res.should.be.json;
        db.EntitiesModel.countDocuments({ "name": ENTITY_2_SYNONYMS_2.name }).should.eventually.equal(1, "Expected to find count of 1 when specifying entity name").notify(done);
      });
  });

  it("adding more entities 2", function (done) {
    chai
      .request(app)
      .post("/api/entities")
      .send(ENTITY_1_SYNONYM)
      .end((err, res) => {
        if (err) done(err)
        res.should.have.status(200);
        res.should.be.json;
        db.EntitiesModel.countDocuments({ "name": ENTITY_1_SYNONYM.name }).should.eventually.equal(1, "Expected to find count of 1 when specifying entity name").notify(done);
      });
  });

  it("Check adding more entities worked", function (done) {
    db.EntitiesModel.countDocuments({}).should.eventually.equal(3, "Expected number of entities in db to be 1").notify(done);
  });

  it("updating entity works", done => {
    chai
      .request(app)
      .post("/api/entities")
      .send(ENTITY_1_SYNONYM_DIFFERENT_SYNONYMS)
      .end((err, res) => {
        const body = res.body;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");

        // mongoose generates a unique id to every item, the id is returned in the object
        // we don't want to check that ids match (they wont as they are generated in the backend)
        for (const synonym of body.synonyms)
          delete synonym._id;

        assert.equal(body.name, ENTITY_1_SYNONYM_DIFFERENT_SYNONYMS.name, "Returned name doesn't match sent name");
        assert.deepEqual(body.synonyms, ENTITY_1_SYNONYM_DIFFERENT_SYNONYMS.synonyms, "Returned entity synonyms doesn't match updated ones.");
        // make sure the database only stores 1 instance of a name & updates that one (ie doesn't make a new entry in the database)
        db.EntitiesModel.countDocuments({}).should.eventually.equal(3, "Expected number of entities in db to be 3 (same number as before the update)").notify(done);
      });


  });

  it("intents get returns all 3 entities", done => {
    chai
      .request(app)
      .get("/api/entities")
      .end((err, res) => {
        if (err) done(err)
        const body = res.body;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        // note: equal will check objects are the same while eql will do a deep equal
        assert.equal(body.length, 3, "Returned array should only have 3 intent");

        // ignore fields generated by mongoose (__v, _id)
        // also ignore last updated field, this should be tested with unit tests
        for (const entity of body) {
          delete entity._id;
          delete entity.__v;
          delete entity.last_updated;

          for (const synonym of entity.synonyms)
            delete synonym._id;
        }
        assert.deepEqual(body.map(a => a.id).sort(), [ENTITY_1_SYNONYM_DIFFERENT_SYNONYMS, ENTITY_2_SYNONYMS, ENTITY_2_SYNONYMS_2].map(a => a.id).sort(), "Returned entities doesn't match expected entities");
        done();
      });
  });

  it("intents remove works", done => {
    chai
      .request(app)
      .delete(`/api/entities/${ENTITY_2_SYNONYMS.name}`)
      .end((err, res) => {
        if (err) done(err)
        const body = res.body;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        // note: equal will check objects are the same while eql will do a deep equal
        assert.equal(body.deleted_count, 1, "Amount of deleted items should be 1");
        assert.equal(true, body.db_ok, "Expected database ok status to be true");
        db.EntitiesModel.countDocuments({}).should.eventually.equal(2, "Expected number of intents in db to be 2").notify(done);
      });
  });
});
