var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app.js');

var config = require('../knexfile')['test'];
var knex = require('knex')(config);

describe('Home Page', function() {
  knex.raw('TRUNCATE users cascade;').then(function(err) {});
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
  // it('should add a new user', function(done) {
  //   request(app).post('/new').send({
  //       fullName: 'Ale2'
  //     })
  //     .end(function(err, res) {
  //       request(app).get('/')
  //         .end(function(err, res) {
  //           expect(res.text).to.include('Ale2');
  //           done();
  //         });
  //     });
  // });
});

// describe('Edit Page', function() {
//   knex.raw('TRUNCATE users cascade;').then(function(err) {});
//   knex('users').insert({
//     user_name: 'Ale1'
//   }).then(function(err) {});
//   it('should say <h1> Edit Page </h1>', function(done) {
//     var id = knex.select('id').from('users');
//     request(app).get("'/' + id + '/edit'").end(function(err, res) {
//       expect(res.text).to.include('<h1> Edit Page </h1>');
//       done();
//     });
//   });
//   //   // it('should add an edit a user', function(done) {
//   //   //   request(app).patch('/6')
//   //   //     .send({
//   //   //       user_name: 'AleEDIT'
//   //   //     })
//   //   //     .end(function(err, res) {
//   //   //       request(app).get('/')
//   //   //         .end(function(err, res) {
//   //   //           expect(res.text).to.include('AleEDIT');
//   //   //           done();
//   //   //         });
//   //   //     });
//   //   // });
// });

describe('Delete Page', function() {
  knex.raw('TRUNCATE users cascade;').then(function(err) {});
  knex('users').insert({
    user_name: 'Ale1'
  }).then(function(err) {});
  it('should delete a user', function(done) {
    var id = knex.select('id').from('users');
    request(app).delete("'/' + id")
      .end(function(err, res) {
        request(app).get('/')
          .end(function(err, res) {
            expect(res.text).to.not.include(id);
            done();
          });
      });
  });
});
