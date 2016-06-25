fashionApp.config(function($routeProvider,$sceDelegateProvider){
	 //$locationProvider.html5Mode( true );		
	//using Strict Contextual Escapiling i have temparily resolved the
	//browser's Same Origin Policy and Cross-Origin Resource Sharing (CORS) policy
	$sceDelegateProvider.resourceUrlWhitelist(['**']);
	$routeProvider
	.when('/',{
		templateUrl : "views/signup.html",
		controller : "HomeController"
	})
	.when('/profile',{
		templateUrl : "views/profile.html",
		controller : "profileController"		
	})
}).run(['$rootScope', '$location', 'authenticate',function($rootScope,$location,authenticate){
				$rootScope.$on('$routeChangeStart',function(event,nextRoute,currentRoute){
							if($location.path() === '/profile' && !authenticate.isLoggedIn()){
								$location.path('/');

								// $rootScope.title = currentRoute.$$route.isLoggedIn;


							}

							//$rootScope.currUser = authenticate.currentUser();			
				});
		}]);