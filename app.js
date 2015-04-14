var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var app = express();
var request = require('request');
var session = require('express-session');
var methodOverride = require('method-override');
var yelp = require("yelp").createClient({
  consumer_key: "vUopKfkIHsDT3_giwNy6jw", 
  consumer_secret: "bw_0vZOV2VtamL2QWRQKwy4Z6Qc",
  token: "m7p0SAIwPHcArRGadTPQHZH9JmiHq12_",
  token_secret: "qPhC-ttqoQi4sFpR9M9wSD5JD6w"
});





app.set('view engine', 'ejs');


app.use(session({
  secret: 'super secret',
  resave: false,
  save: {
  	uninitialize: true
  }
 })); 

//middleware to store cookies
app.use('/', function(req,res,next) { 
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
// render to the index.ejs file
app.get('/', function(req, res) {
   res.render('index.ejs'); // We use res.render to display an EJS file instead of res.send() 
});

// Here we add User routes together
// First route is for the user to log inin
app.get('/login', function(req, res){
	res.render('users/login');
});

// User to Sign up route
app.get('/signup', function(req, res) {
	res.render('users/signup');
});

app.post('/login', function(req,res) {
	var email = req.body.email;
	var password = req.body.password;
	db.User.find({ where: { email: email}})
	  .then(function(user) {
	  	req.login(user);
	  	  res.redirect('/profile');
	  });
});

// Posts to User database
app.post('/signup', function(req, res) {
	var email = req.body.email;
	var password =  req.body.password;
	db.User.createSecure(email,password)
		.then(function(user) {
			req.login(user);
			res.redirect('/profile');
		});
});

// Here is a route to logout the user
app.delete('/logout', function(req,res){
	res.send('Logs out User!');
});

app.get('/profile', function(req, res){
	req.currentUser()
	  .then(function (user) {
	  	res.render('users/profile', {user: user});
	  });
	
});


//Routes for search page including API
app.get('/search', function(req, res) {
	var foodSearch = req.query.food;
	if (!foodSearch) {
		res.render('site/search', {results: [], noFood:true});
	} else {
	var food = req.query.food;
	var location = req.query.location;
	var url = "http://api.yelp.com/v2/search?term=restaurant+" + food + "&location=" + location;
	request(url, function(err, resp, body) {
	  if (!err && res.statusCode === 200) {
		var jsonData = JSON.parse(body);
		console.log('\n\n\n\nThis is JSON DATA', jsonData);
		if (!jsonData.Search) {
			res.render('search', {movies: [], noMovies: true});
		} else  {
		res.render('search', {movies: jsonData.Search, noMovies: false});
	    }
	}
	  });
	}
});







// 	yelp.search({term: "food", location: "San Francisco"}, function(error, data) {
//   	console.log(error);
//   	console.log(data);
//   	  res.render('site/search', {results: data.businesses});
//     });

// });





app.get('/dish', function(req, res) {
	res.send('List of Dishes')
});




// Start the server on port 3000
app.listen(3000, function() {
	console.log("I am listening");
});