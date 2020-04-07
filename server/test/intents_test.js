const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiAsPromised = require('chai-as-promised');

const app = require('../server').app;
const db_helper = require("../Api/db_helper_api");
const db = require("../database");

const should = chai.should();
const assert = require('chai').assert;
const expect = require('chai').expect;

const SERVER_URL = `http://localhost:${process.env.SERVER_PORT}`;

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe("Intents", () => {
  // Called once before each of the tests in this block.
  before(function (done) {
    console.log("cleaning db");
    db_helper.clear_db(done);
  });

  const INTENT_2_EXPRESSIONS = {
    'name': 'test_name',
    'expressions': [
      'test_1', 'test_2'
    ],
  };
  const INTENT_1_EXPRESSION = {
    'name': 'test_name',
    'expressions': [
      'test_1',
    ],
  };

  it("intents should be empty", done => {
    db.IntentsModel.countDocuments({}).should.eventually.equal(0, "Expected number of intents in db to be 0 (cleaned before tests)").notify(done);
  });
  it("posting new intent works", function(done) {
    chai
      .request(app)
      .post("/api/intents")
      .send(INTENT_2_EXPRESSIONS)
      .end((err, res) => {
        if (err) done(err)
        const body = res.body;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        assert.equal(body.name, INTENT_2_EXPRESSIONS.name, "Returned name doesn't match sent name");
        assert.deepEqual(body.expressions, INTENT_2_EXPRESSIONS.expressions, "Returned expressions list doesn't match sent expressions");
        db.IntentsModel.countDocuments({}).should.eventually.equal(1, "Expected number of intents in db to be 1").notify(done);
      });
  });

  it("updating intent works", done => {
    chai
      .request(app)
      .post("/api/intents")
      .send(INTENT_1_EXPRESSION)
      .end((err, res) => {
        const body = res.body;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        assert.equal(body.name, INTENT_1_EXPRESSION.name, "Returned name doesn't match sent name");
        assert.deepEqual(body.expressions, INTENT_1_EXPRESSION.expressions, "Returned expressions list doesn't match sent expressions");
        
        // make sure the database only stores 1 instance of a name & updates that one (ie doesn't make a new entry in the database)
        db.IntentsModel.countDocuments({}).should.eventually.equal(1, "Expected number of intents in db to be 1").notify(done);
      });
  });

  it("intents get returns single intent", done => {
    chai
      .request(app)
      .get("/api/intents")
      .end((err, res) => {
        if (err) done(err)
        const body = res.body;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        // note: equal will check objects are the same while eql will do a deep equal
        assert.equal(body.length, 1, "Returned array should only have 1 intent");
        assert.equal(body[0].name, INTENT_1_EXPRESSION.name, "Returned intent name doesn't match expected name");
        assert.deepEqual(body[0].expressions, INTENT_1_EXPRESSION.expressions, "Returned intent expressions doesn't match expected expressions");
        done();
      });
  });

  it("intents remove works", done => {
    chai
      .request(app)
      .delete(`/api/intents/${INTENT_1_EXPRESSION.name}`)
      .end((err, res) => {
        if (err) done(err)
        const body = res.body;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        // note: equal will check objects are the same while eql will do a deep equal
        assert.equal(body.deleted_count, 1, "Amount of deleted items should be 1");
        assert.equal(true, body.db_ok, "Expected database ok status to be true");
        db.IntentsModel.countDocuments({}).should.eventually.equal(0, "Expected number of intents in db to be 0").notify(done);
      });
  });
});
