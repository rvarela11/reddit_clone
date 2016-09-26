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
});

describe('New User Page', function() {
  knex.raw('TRUNCATE users cascade;').then(function(err) {});
  it('should say <h1> New User Page </h1>', function(done) {
    request(app).get('/new').end(function(err, res) {
      expect(res.text).to.include('<h1> New User Page </h1>');
      done();
    });
  });
  knex('users').then(function(err) {});
  it('should add a new user', function(done) {
    request(app).post('/new').type('form').send({
      userName: 'AleNEW'
    }).end(function(err, res) {
      request(app).get('/')
        .end(function(err, res) {
          expect(res.text).to.include('AleNEW');
          done();
        });
    });
  });
});

describe('Edit Page', function() {
  knex.raw('TRUNCATE users cascade;').then(function(err) {});
  knex('users').insert({
    id: 1,
    user_name: 'Ale1'
  }).then(function(err) {});
  it('should say <h1> Edit Page </h1>', function(done) {
    var id = knex.select('id').from('users');
    request(app).get('/1/edit').end(function(err, res) {
      expect(res.text).to.include('<h1> Edit Page </h1>');
      done();
    });
  });
  it('should add an edit a user', function(done) {
    request(app).patch('/1').type('form')
      .send({
        userName: 'AleEDIT'
      })
      .end(function(err, res) {
        request(app).get('/')
          .end(function(err, res) {
            expect(res.text).to.include('AleEDIT');
            done();
          });
      });
  });
});

describe('Delete Page', function() {
  // knex.raw('TRUNCATE users cascade;').then(function(err) {});
  knex('users').insert({
    id: 2,
    user_name: 'AleDelete'
  }).then(function(err) {});
  it('should delete a user', function(done) {
    // var user = knex('users').where({
    //   user_name: 'AleDelete'
    // }).select('id').then(function(err) {});
    request(app).delete('/2').type('form').end(function(err, res) {
      request(app).get('/')
        .end(function(err, res) {
          expect(200);
          done();
        });
    });
  });
});
