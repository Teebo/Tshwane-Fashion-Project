//IN THIS FILE WE ARE CONFIGURING THE PASSPORT STRATEGY
//REQUIRING MONGOOSE AND OUR MODEL BECAUSE WE WILL USE THEM IN OUR VERIFY FUNCTION(done)

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user.js');

passport.use(new LocalStrategy(


//The third parameter(done) in the following function is az callback function
//that will be the second paramether in the passport.authenticate() method that will
//contain the user object and the info which is passed from the strategy configuration way below 
function(username,password,done){

//If the user is found in the DB,the findOne function will return that user via the done callback 
//in the params list above
	User.findOne({username : username},function(err,user){
		if(err){return done(err);}
		
		//Return if user not found in database
		if(!user){
			return done(null,false,{
				message : 'User not found'
			});
		}

		//Return if password is wrong
		if(!user.validPassword(password)){
			return done(null,false,{
				message : 'Password wrong'
			});
		}

		//If credentials are correct, return the user object

		return done(null,user);
	});
}
))