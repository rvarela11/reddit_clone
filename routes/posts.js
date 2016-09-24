var express = require("express");
var router = express.Router({
  mergeParams: true
});
var knex = require("../db/knex");

router.get('/post', function(req, res) {
  res.send("POST");
});

// router.get('users/:id/posts', function(req, res) {
//   knex('users').where('id', '=', req.params.id).innerJoin('posts',
//     'posts.user_id', 'user.id').then(function(data) {
//     console.log(data);
//     // res.render('users/new').catch(function(err) {
//     console.log(err);
//     // });
//   });
// });

// router.get('/new/post', function(req, res) {
//   knex('users').where({
//     id: req.params.user_id
//   }).first().then(function(user) {
//     res.render("posts/new", {
//       user: users
//     });
//   }).catch(function(err) {
//     console.log(err);
//   });
// });

module.exports = router;
