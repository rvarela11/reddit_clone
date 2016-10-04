var express = require("express");
var router = express.Router({
  mergeParams: true
});
var knex = require("../db/knex");

router.get('/users/:id/posts/new', function(req, res) {
  var userID = req.params.id;
  res.render("posts/new", {
    userID: userID
  });
});

router.post('/users/:id/posts/new', function(req, res) {
  var userID = req.params.id;
  knex('posts').insert({
    title: req.body.title,
    body: req.body.body,
    user_id: knex.select('id').from('users').where('id', userID)
  }).then(function(users) {
    res.redirect('/');
  }).catch(function(err) {
    console.log(err);
  });
});

router.get('/users/:id/posts', function(req, res) {
  var userID = req.params.id;
  knex('posts').where({
    user_id: userID
  }).then(function(posts) {
    res.render("posts/single-thread", {
      posts: posts,
      userID: userID
    })
  });
});

router.get('/posts/:id/edit', function(req, res) {
  knex('posts').where({
    id: req.params.id
  }).first().then(function(post) {
    res.render('posts/edit', {
      post: post
    });
  }).catch(function(err) {
    console.log(err);
  });
});

router.patch('/posts/:id', function(req, res) {
  knex('posts').where({
    id: req.params.id
  }).update({
    title: req.body.title,
    body: req.body.body
  }).then(function() {
    res.redirect('/');
  }).catch(function(err) {
    console.log(err);
  });
});

router.delete('/posts/:id', function(req, res) {
  knex('posts').where({
    id: req.params.id
  }).del().then(function() {
    res.redirect('/');
  }).catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
