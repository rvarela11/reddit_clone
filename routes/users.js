var express = require("express");
var router = express.Router();
var knex = require("../db/knex");

router.get('/', function(req, res) {
	res.send('HOME PAGE');
});

router.get('/users', function(req, res) {
	res.send('USERS');
});

router.get('/new', function(req, res) {
	res.render('views/users/new');
});

// 	// Create
// 	.post(function(req, res){
// 		knex("users").insert(req.body.user)
// 			.returning("id")
// 			.then(function(id){
// 				res.redirect(`/users/${id}`);
// 			})
// 			.catch(function(err){
// 				console.log(err);
// 			});
// 	})
//
// router.route("/new")
// 	.get(function(req, res){
// 		res.render("users/new");
// 	});



module.exports = router;
