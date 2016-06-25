fashionApp
         .controller('HomeController',function($scope,$http,$location,authenticate){
         	console.log("Hey sign up");

         	$scope.submitForm = function(){
         		$http.post('/signup',$scope.registerUser)
         			.success(function(res){
     					console.log("Got response from server");
	  				 	authenticate.saveToken(res.token);
	  				 	console.log(res.token);
	  				 	$location.path('/profile');
         			})
         			.error(function(err){
         				console.log("There was an error signing up the user " + err);
         			});
         	};
         })