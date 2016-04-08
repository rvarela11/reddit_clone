var express = require("express");
	router = express.Router();
	knex = require("../db/knex")

router.route("/")
	// Index
	// All the posts
	// .get()

	// Create
	.post(function(req, res){
		knex("users").insert(req.body.user)
			.returning("id")
			.then(function(id){
				res.redirect(`/users/${id}`);
			})
			.catch(function(err){
				console.log(err);
			});
	})

router.route("/new")
	.get(function(req, res){
		res.render("users/new");
	});




module.exports = router;
