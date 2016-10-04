var express = require("express");
var router = express.Router();
var knex = require("../db/knex");

router.get('/', function(req, res) {
	knex('users').then(
		function(users) {
			res.render('users/index', {
				users: users
			});
		}).catch(function(err) {
		console.log(err);
	});
});

router.get('/new', function(req, res) {
	res.render('users/new');
});

router.post('/new', function(req, res) {
	console.log(req.body.fullName);
	knex('users').insert({
		full_name: req.body.fullName,
		user_name: req.body.userName,
		created_at: new Date(),
		updated_at: new Date()
	}).then(function(users) {
		res.redirect('/');
	}).catch(function(err) {
		console.log(err);
	});
});

// router.get('/:id', function(req, res) {
// 	knex('users').from('users').where({
// 		id: req.params.id
// 	}).first().then(function(user) {
// 		res.render(user);
// 	}).catch(function(err) {
// 		console.log(err);
// 	});
// });

router.get('/:id/edit', function(req, res) {
	knex('users').where({
		id: req.params.id
	}).first().then(function(user) {
		res.render('users/edit', {
			user: user
		});
	}).catch(function(err) {
		console.log(err);
	});
});

router.patch('/:id', function(req, res) {
	knex('users').where({
		id: req.params.id
	}).update({
		user_name: req.body.userName,
		updated_at: new Date()
	}).then(function() {
		res.redirect('/');
	}).catch(function(err) {
		console.log(err);
	});
});

router.delete('/:id', function(req, res) {
	knex('users').where({
		id: req.params.id
	}).del().then(function() {
		res.redirect('/');
	}).catch(function(err) {
		console.log(err);
	});
});

module.exports = router;
