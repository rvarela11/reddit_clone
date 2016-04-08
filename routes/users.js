var express = require("express");
	router = express.Router();
	//knex

router.route("/")
	// All the posts
	// .get() 

router.route("/new")
	.get(function(req, res){
		res.render("users/new");
	});




module.exports = router;
