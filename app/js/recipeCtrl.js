dinnerPlannerApp.controller('RecipeCtrl', function ($scope,Dinner) {
	$scope.numberOfGuests = Dinner.getNumberOfGuests();
	$scope.menu = Dinner.getFullMenu();
});