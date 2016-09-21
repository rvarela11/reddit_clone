var express = require("express");
var router = express.Router();
var knex = require("../db/knex");

router.get('/posts', function(req, res) {
  res.send('POSTS');
});

module.exports = router;
