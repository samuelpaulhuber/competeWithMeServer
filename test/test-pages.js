/**
 * Created by samhuber on 1/1/18.
 */
var expect  = require('chai').expect;
var request = require('request');
var token = '{"success":true,"dateIssued":"2017-12-28T00:27:44.781Z","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNTE0NDIwODY0fQ.hUj7MBcSQ9C7qm8IOLpQnJ2VqTii6ePlwQfx5jZ2pMs"}';
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
var app = 'localhost:3000/compete';

describe("Compete Unit Testing", function() {
  describe("User Drill Data", function() {
    it("Add User Drill Data", function(done) {
      // Send some Form Data
      chai.request(app)
        .post('/addUserDrillData')
        .set('x-access-token', token)
        .send({
          drillId: '1',
          userId: '7',
          time: 11.77,
          alpha: 0,
          charlie: 0,
          delta: 0,
          mike: 0,
          noShoot: 0,
          penalty: 0
        })
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it("Update User Drill Data", function(done) {
      // Send some Form Data
      chai.request(app)
        .post('/updateUserDrillData')
        .set('x-access-token', token)
        .send({
          id: 1,
          time: 19.19,
          alpha: 26,
          charlie: 4,
          delta: 2,
          mike: 0,
          noShoot: 0,
          penalty: 0
        })
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it("Get User Drill Data", function(done) {
      // Send some Form Data
      chai.request(app)
        .post('/deleteUserDrillData')
        .set('x-access-token', token)
        .send({
          drillId: 1,
          userId: 1
        })
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it("Delete User Drill Data", function(done) {
      // Send some Form Data
      chai.request(app)
        .post('/deleteUserDrillData')
        .set('x-access-token', token)
        .send({
          id: 1
        })
        .end(function (err, res) {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });
});