dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.getPendingPrice = function(){
  	var pending = Dinner.getPending();
  	if(pending === "none"){
  		return 0;
  	} else {
  		return Dinner.getPriceOfDish(pending);
  	}
  }

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.priceOf = function(dish){
    return Dinner.getPriceOfDish(dish);
  }

  $scope.removeDish = function(id){
    Dinner.removeDishFromMenu(id);
  }

  $scope.totalCost = function(){
    $scope.totalPrice = 0;
    for(dish in $scope.fullMenu){
      $scope.totalPrice += $scope.priceOf($scope.fullMenu[dish]);
    }
    return $scope.totalPrice + $scope.getPendingPrice();
  }

  $scope.fullMenu = Dinner.getFullMenu();

  $scope.pendingEnabled = function(){
    if(Dinner.hasPending()){
      return true;
    } else {
      return false;
    }
  }
  // $scope.hasPending = Dinner.hasPending();

  // console.log("fullMenu in dinnerCtrl.js");
  // console.log($scope.fullMenu);
});