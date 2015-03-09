
// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  var pending = "none";
  var loading = true;
  var error = false;
  var hasPending = false;

  if(!$cookieStore.get("numGuests")){
    var numberOfGuests = 4;
  } else {
    var numberOfGuests = $cookieStore.get("numGuests");
  }

  this.setNumberOfGuests = function(num) {
    numberOfGuests = num;
    $cookieStore.put("numGuests", numberOfGuests);
  }

  this.getNumberOfGuests = function() {
    return numberOfGuests;
  }

  // this.getDish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'dvxLl271adHi9kSJNj29sNWp256I35Y0'});
  this.getDish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'dvxf6h66dHv0y2ifdEB9b9783szhaO7q'});
  // this.searchDishes = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'dvxLl271adHi9kSJNj29sNWp256I35Y0'});
  this.searchDishes = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'dvxf6h66dHv0y2ifdEB9b9783szhaO7q'});

  var menu = [];
  if($cookieStore.get("fullMenu")){
    var cookieMenu = $cookieStore.get("fullMenu");
    for(dish in cookieMenu){
      // console.log(cookieMenu[dish]);
      this.getDish.get({id:cookieMenu[dish]}, function(data){
        menu.push(data);
        // console.log("cookie menu item:");
        // console.log(data);
      });
    }
  }

  this.addPending = function(dish){
    hasPending = true;
    pending = dish;
  }

  this.getPending = function(){
    return pending;
  }

  this.removePending = function(){
    hasPending = false;
    pending = "none";
  }

  this.hasPending = function(){
    return hasPending;
  }
  
  this.getFullMenu = function() {
    // console.log("getFullMenu called");
    // console.log(menu);
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
    var recipeIDs = [];
    // console.log("iteration");
    for(dish in menu){
      // console.log(menu[dish].Title);
      recipeIDs.push(menu[dish].RecipeID);
    }
    $cookieStore.put("fullMenu", recipeIDs);
  }

  this.removeDishFromMenu = function(id) {
    var currentRecipes = $cookieStore.get("fullMenu");
    for(recipeID in currentRecipes){
      if(currentRecipes[recipeID] === id){
        currentRecipes.splice(recipeID, 1);
      }
    }
    $cookieStore.put("fullMenu", currentRecipes);

    for(dish in menu){
      if(menu[dish].RecipeID === id){
        menu.splice(dish, 1);
      }
    }
  }


  this.getPriceOfDish = function(dish){
    var priceOfDish = 0;
    for(ingredient in dish.Ingredients){
      priceOfDish += dish.Ingredients[ingredient].Quantity * this.getNumberOfGuests();
    }
    return priceOfDish;
  }

  // this.getAllDishes = function() {
  //   return dishes;
  // }

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