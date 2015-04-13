var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var app = express();
var request = require('request');
var session = require('express-session');
var methodOverride = require('method-override');


app.set('view engine', 'ejs');


app.use(session({
  secret: 'super secret',
  resave: false,
  save: {
  	uninitialize: true
  }
 })); 

app.use('/', function(req,res,next) { //middleware to store cookies
	req.login = function(user) {
		req.session.userId = user.id;
	};
	req.currentUser = function() {
		return db.User.find(req.session.userId)
				.then(function(dbUser) {
					req.user = dbUser;
					return dbUser;
				});
	};
	req.logout = function() {
		req.session.userId = null;
		req.user = null;
	}
	next();
});

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));








// Let's add some routes here together:
app.get('/', function(req, res) {
   res.send("Homepage!"); // We use res.render to display an EJS file instead of res.send() 
});


// Start the server on port 3000
app.listen(3000);