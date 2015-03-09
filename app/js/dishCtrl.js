// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
	$scope.priceOfPending = 0;
	$scope.pendingDishID = $routeParams.dishId;

	$scope.getPendingInfo = function(){
		$scope.status = "Retrieving dish...";
		console.log("PendingDishId: "+$scope.pendingDishID);
		$scope.loading = true;
		$scope.ready = false;
		Dinner.getDish.get({id:$scope.pendingDishID},function(data){
			$scope.pendingDish = data;
			Dinner.addPending(data);
			$scope.status = "";
			$scope.loading = false;
			$scope.ready = true;
		}, function(data){
			$scope.status = "There was an error";
		});
	}

	$scope.getPendingInfo();

	$scope.priceOf = function(dish){
		if(!dish){
			return "retrieving data..."
		} else {
			return Dinner.getPriceOfDish(dish);
		}
	}

  	$scope.getNumberOfGuests = function() {
    	return Dinner.getNumberOfGuests();
  	}

  	$scope.confirmDish = function(){
  		Dinner.addDishToMenu(Dinner.getPending());
  		Dinner.removePending();

  	}

  	$scope.backToEdit = function(){
  		Dinner.removePending();
  	}
  
});