var express = require("express");
var router = express.Router();
var knex = require("../db/knex");

router.get('/comments', function(req, res) {
  res.send('COMMENTS');
});

module.exports = router;
