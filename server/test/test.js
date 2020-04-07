const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('../server').app;

const db_helper = require("../Api/db_helper_api");

const should = chai.should();
const assert = require('chai').assert;
const expect = require('chai').expect;

const SERVER_URL = `http://localhost:${process.env.SERVER_PORT}`;

chai.use(chaiHttp);

describe("Intents", () => {
  // Called once before each of the tests in this block.
  before(function (done) {
    console.log("cleaning db");
    db_helper.clear_db(done);
  });

  it("intents should be empty", done => {
    chai
      .request(app)
      .get("/api/intents")
      .end((err, res) => {
        if (err) done(err)
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        res.body.should.be.eql([]);
        done();
      });
  });

});