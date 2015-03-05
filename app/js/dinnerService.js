// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  var pending = "none";
  var numberOfGuest = 2;
  var menu = [];
  var dishes = [];
  var loading = true;
  var error = false;

  this.isLoading = function(){
    return loading;
  }

  this.hasError = function(){
    return error;
  }

  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
    $cookieStore.put("numGuests", numberOfGuest);
  }

  this.getNumberOfGuests = function() {
    var numberOfGuest = $cookieStore.get("numGuests");
    return numberOfGuest;
  }

  this.getDish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'dvxLl271adHi9kSJNj29sNWp256I35Y0'});
  this.searchDishes = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'dvxLl271adHi9kSJNj29sNWp256I35Y0'});

  this.addPending = function(id){
    pending = getDish.get({id:id});
  }

  this.getPending = function(){
    return pending;
  }

  this.removePending = function(){
    pending = "none";
  }

  this.getFullMenu = function() {
    return menu;
  }

  this.getTotalMenuPrice = function() {
    var totalMenuPrice = 0;
    for(dish in menu) {
      totalMenuPrice += this.getNumberOfGuests()*menu[dish].pricePerPerson;
    }
    return totalMenuPrice;
  }

  this.addDishToMenu = function(pending) {
    var duplicates = false;
    if(menu.length === 0){
      menu.push(pending);
    } else {
      for(dish in menu){
        if(menu[dish].RecipeID === pending.RecipeID){
          alert(menu[dish].Title +" is already in the menu!");
          duplicates = true;
          break;
        }
      }
      if(!duplicates){
        if(menu.length<3){
          menu.push(pending);
        } else {
          menu.splice(2,1,pending);
        }
      }
    }
  }

  this.removeDishFromMenu = function(id) {
    for(dish in menu){
      if(menu[dish].RecipeID === id){
        menu.splice(dish, 1);
      }
    }
  }

  this.generateDishes = function(type, filter){
    dishes = searchDishes.get();
  }

  this.getPriceOfDish = function(dish){
    var priceOfDish = 0;
    for(ingredient in dish.Ingredients){
      priceOfDish += dish.Ingredients[ingredient].Quantity * guests;
    }
    return priceOfDish;
  }

  this.getAllDishes = function() {
    return dishes;
  }
  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details



  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});