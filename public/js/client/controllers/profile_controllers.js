fashionApp
		.controller("profileController",function($scope,$http,$location,profileData,authenticate){
				  	 $scope.hey = "Hey my profile";
		  	 		  		$scope.isLoggedIn = authenticate.isLoggedIn();
		 		$scope.currentUser = authenticate.currentUser();

		  	 $scope.userProData = {};

		  	 profileData.getProfile()
		  	 			.success(function(res){
		  	 				 $scope.userProData = res;
		  	 				 console.log(JSON.stringify($scope.userProData,null,"\t"));

		  	 			})
		  	 			.error(function(err){
		  	 				console.log("There was an error getting profile data " + err);
		  	 			});
		})