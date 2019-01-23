import axios from "axios";

export default {
//add to favorites 
  saveFavorite: function(id) {
    return axios.post("/api/favorites", id);
  },
//add user
  addUser: function(user){
    return axios.post("/api/users", user);
  },
//Get user
  getUser: function(user){
    return axios.get("/api/users", user);
  },
  updateUser: function(id,favorite){
    return axios.post("/api/users/" + id, favorite);
  },

  // Get the drink(s) with the given drink name
  getDrinksByDrink: function(drinkName) {
    return axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName);
  },

  // Get the drink(s) with the given ingredient name
  getDrinksByIngredient: function(ingredientName) {
    return axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredientName);
  },

  // Get the drink with the given id
  getDrinkById: function(id) {
    return axios.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id);
  },

  // Get a random drink
  getRandomDrink: function() {
    return axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
  }
};
