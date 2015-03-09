dinnerPlannerApp.controller('ConfirmCtrl', function ($scope,Dinner) {
 	$scope.loading = true;
 	$scope.numberOfGuests = Dinner.getNumberOfGuests();
 	$scope.menu = Dinner.getFullMenu();

 	$scope.priceOf = function(dish){
 		return Dinner.getPriceOfDish(dish);
 	}

 	$scope.totalMenuPrice = function(){
 		$scope.totalPrice = 0;
 		for(dish in $scope.menu){
 			$scope.totalPrice += Dinner.getPriceOfDish($scope.menu[dish]);
 		}
 		return $scope.totalPrice;
 	}
});