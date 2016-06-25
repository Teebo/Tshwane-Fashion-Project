var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new Schema({
	username : {type : String,required : true},
	email : {type : String,required : true},
	usertype : {type : String,required : true},
	"hash" : String,
	"salt" : String

},{timestamps : true});

userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
};


//The validPassword returns a boolean value,
//If the hash we create in this function is the same as the one we had
//saved when registering the user,return true otherwise return false

userSchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
	return this.hash === hash;
};

userSchema.methods.generateJwt = function(){
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id : this.id,
		email : this.email,
		username : this.username,
		usertype : this.usertype,
		exp : parseInt(expiry.getTime() / 1000)
	}, "MY_SECRET");
};

userSchema.pre('save',function(next){

	var user = this;

	user.setPassword(user.password);
	next();
});

var User = mongoose.model('User',userSchema);

module.exports = User;




