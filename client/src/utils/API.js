import axios from "axios";

export default {
 
  saveFavorite: function(buttonData) {
    return axios.post("/api/favorites", buttonData);
  },

  addUser: function(user){
    return axios.post("/api/users", user);
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
