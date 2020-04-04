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

  it("should get intents", done => {
    chai
      .request(app)
      .get("/api/intents")
      .end((err, res) => {
        if (err) done(err)
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        console.log(res.body);
        done();
      });
  });
  it("intents generation", done => {
    chai
      .request(app)
      .post("/api/intents-generation")
      .end((err, res) => {
        if (err) done(err)
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        console.log(res.body);
        done();
      });
  });
  it("should get intents 2", done => {
    chai
      .request(app)
      .get("/api/intents")
      .end((err, res) => {
        if (err) done(err)
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        console.log(res.body.length);
        done();
      });
  });
});