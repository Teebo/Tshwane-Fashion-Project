var passport = require('passport');
var User = require('../models/user.js')

exports.registerUser = function(req,res){
	

  var newUser = new User();

  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.usertype = req.body.userType;

  newUser.setPassword(req.body.password);


newUser.save(function(err){
		if(err) {console.log("Something went wrong with saving the user in the DB " + err);}
		var token;

		token = newUser.generateJwt();
		res.status(200);
		console.log("New user successfully saved");
		res.json({"token" : token});
	
	});
};

exports.profile = function(req,res){
	//If not user user exists in the JWT return a 401
		console.log(req.payload);
	if(!req.payload._id){

		res.status(401).json({
			"message" : "UnauthorizedError : private profile"
		});
	}else{
		//Otherwise continue
		User.findById(req.payload._id,function(err,user){

			res.status(200).json(user);
		});
	}
};