var express = require("express"),
	app = express(),
	methodOverride = require("method-override"),
	port = process.env.PORT || 3000,
	morgan = require("morgan"),
	bodyParser = require("body-parser"),
	usersRouter = require("./routes/users"),
	postsRouter = require("./routes/posts"),
	commentsRouter = require("./routes/comments");

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(methodOverride('_method'));

// Routes
app.use(usersRouter);
app.use(postsRouter);
app.use(commentsRouter);

app.use(function(req, res) {
	res.sendStatus(404);
});

app.listen(port, function() {
	console.log("Server is listening on port 3000");
});

module.exports = app;
