const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiAsPromised = require('chai-as-promised');

const app = require('../../server').app;
const db_helper = require("../../Api/db_helper_api");
const db = require("../../database");
const assert = require('chai').assert;
const should = chai.should();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe("Entity", () => {
  // Called once before each of the tests in this block.
  before(function (done) {
    console.log("cleaning db");
    db_helper.clear_db(done);
  });

  const ENTITY_2_EXPRESSIONS = {
    'name': 'test_name',
    'expressions': [
      'test_1', 'test_2'
    ],
  };
  const ENTITY_1_EXPRESSION = {
    'name': 'test_name',
    'expressions': [
      'test_1',
    ],
  };

  it("entities should be empty", done => {
    db.EntitiesModel.countDocuments({}).should.eventually.equal(0, "Expected number of entities in db to be 0 (cleaned before tests)").notify(done);
  });
  it("posting new entity works", function (done) {
    chai
      .request(app)
      .post("/api/entities")
      .send(ENTITY_2_EXPRESSIONS)
      .end((err, res) => {
        if (err) done(err)
        const body = res.body;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        assert.equal(body.name, ENTITY_2_EXPRESSIONS.name, "Returned name doesn't match sent name");
        assert.deepEqual(body.expressions, ENTITY_2_EXPRESSIONS.expressions, "Returned expressions list doesn't match sent expressions");
        db.EntitiesModel.countDocuments({}).should.eventually.equal(1, "Expected number of entities in db to be 1").notify(done);
      });
  });

  it("updating entity works", done => {
    chai
      .request(app)
      .post("/api/entities")
      .send(ENTITY_1_EXPRESSION)
      .end((err, res) => {
        const body = res.body;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        assert.equal(body.name, ENTITY_1_EXPRESSION.name, "Returned name doesn't match sent name");
        assert.deepEqual(body.expressions, ENTITY_1_EXPRESSION.expressions, "Returned expressions list doesn't match sent expressions");

        // make sure the database only stores 1 instance of a name & updates that one (ie doesn't make a new entry in the database)
        db.EntitiesModel.countDocuments({}).should.eventually.equal(1, "Expected number of entities in db to be 1").notify(done);
      });
  });

  it("entities get returns single entity", done => {
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
        assert.equal(body.length, 1, "Returned array should only have 1 entity");
        assert.equal(body[0].name, ENTITY_1_EXPRESSION.name, "Returned entity name doesn't match expected name");
        assert.deepEqual(body[0].expressions, ENTITY_1_EXPRESSION.expressions, "Returned entity expressions doesn't match expected expressions");
        done();
      });
  });

  it("entities remove works", done => {
    chai
      .request(app)
      .delete(`/api/entities/${ENTITY_1_EXPRESSION.name}`)
      .end((err, res) => {
        if (err) done(err)
        const body = res.body;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        // note: equal will check objects are the same while eql will do a deep equal
        assert.equal(body.deleted_count, 1, "Amount of deleted items should be 1");
        assert.equal(true, body.db_ok, "Expected database ok status to be true");
        db.EntitiesModel.countDocuments({}).should.eventually.equal(0, "Expected number of entities in db to be 0").notify(done);
      });
  });
});
