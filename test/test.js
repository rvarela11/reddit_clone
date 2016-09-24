var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app.js');

var config = require('../knexfile')['test'];
var knex = require('knex')(config);

describe('Home Page', function() {
  it('should say <h1> Home Page </h1>', function(done) {
    request(app).get('/').end(function(err, res) {
      expect(res.text).to.include('<h1> Home Page </h1>');
      done();
    });
  });
  knex('users').insert({
    user_name: 'Ale1'
  }).then(function(err) {});
  it('should say Username Ale1', function(done) {
    request(app).get('/').end(function(err, res) {
      expect(res.text).to.include('Ale1');
      done();
    });
  });
});

describe('New User Page', function() {
  it('should say <h1> New User Page </h1>', function(done) {
    request(app).get('/new').end(function(err, res) {
      expect(res.text).to.include('<h1> New User Page </h1>');
      done();
    });
  });

  // knex('users').then(function(err) {});
  it('should add a new user', function(done) {
    request(app).post('/new')
      .send({
        user_name: 'Delete'
      })
      .end(function(err, res) {
        request(app).get('/')
          .end(function(err, res) {
            expect(res.text).to.include('Delete');
            done();
          });
      });
  });
});

describe('Edit Page', function() {
  it('should say <h1> Edit Page </h1>', function(done) {
    request(app).get('/2/edit').end(function(err, res) {
      expect(res.text).to.include('<h1> Edit Page </h1>');
      done();
    });
  });
  // it('should add an edit a user', function(done) {
  //   request(app).patch('/6')
  //     .send({
  //       user_name: 'AleEDIT'
  //     }) 9566211966
  //     .end(function(err, res) {
  //       request(app).get('/')
  //         .end(function(err, res) {
  //           expect(res.text).to.include('AleEDIT');
  //           done();
  //         });
  //     });
  // });
});

describe('Delete Page', function() {
  it('should delete a user', function(done) {
    request(app).delete('/4')
      .end(function(err, res) {
        request(app).get('/')
          .end(function(err, res) {
            expect(res.text).to.not.include({
              id: 4
            });
            done();
          });
      });
  });
});
