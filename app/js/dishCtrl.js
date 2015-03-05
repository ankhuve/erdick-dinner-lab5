// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
	$scope.getDishID = function(){
		var dishID = $routeParams.dishId;
		return dishID;
	}

	$scope.priceOf = function(dishID) {
		return Dinner.getPriceOfDish(dishID);
	}

	$scope.getDish = function(query){
	   $scope.status = "Retrieving dish...";
	   $scope.loading = true;
	   Dinner.getDish.get({id:query},function(data){
	     	$scope.pendingDish=data.Results;
	     	$scope.loading = false;
	     	$scope.status = "Showing " + data.Results.length + " results";
	   	},function(data){
	     	$scope.status = "There was an error";
	   	});
 	}



	// 	$scope.status = "swag";
	// 	$scope.loading = true;
	// 	Dinner.getDish.get({id:query}, function(data){
	// 		$scope.pendingDish = data.Results;
	// 	})
	// 	return Dinner.getDish(dishID);
	// }
	// $scope.pendingDish = Dinner.getDish();


  // $routeParams.dishId
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  
});