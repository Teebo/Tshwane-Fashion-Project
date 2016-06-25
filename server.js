var express = require('express');
var app = express();
require("./public/js/server/models/db");
var users = require('./public/js/server/middleware/user.js')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
require("./public/js/server/config/passport");

//When verifying the token from the client side,if the secrets are not the same
//in her eand in the models,it will give a UnauthorizedError: invalid signature
var jwt = require('express-jwt');
var auth = jwt({
	secret : 'MY_SECRET',
	userProperty : 'payload'
});


//Initializing passport as a middleware
app.use(passport.initialize());
//app.use('/',routesApi);

app.use(express.static(__dirname + "/public"));

//configure app to use bodyParser
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  res.header("Access-Control-Allow-Methods","POST,GET,PUT,DELETE,OPTION");
  next();
});

app.use(function(err,req,res,next){
	 if(err.name === 'UnauthorizedError'){
	 		res.status(401);
	 		res.json({"message" : err.name + ":" + err.message});
	 }
});

app.get('/',function(req,res){

	console.log("Got request from server");
	res.end();
});


app.post('/signup',users.registerUser);
app.get('/profile',auth,users.profile);


app.listen(3000,function(){
	console.log("Port running on port 3000");
})