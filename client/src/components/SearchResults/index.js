import React, { Component } from "react";
import logo from "../../logo.svg";
import "../../App.css";
import API from "../../utils/API";




class SearchResults extends Component {

  /* state = {
    favoritesArray: [],
    cocktailID:""
  };


  addTofavorites = event => {
    event.preventDefault();
    console.log(event.target.value);
    API.saveFavorite({cocktailID: event.target.value})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  
  }; */




  render() {
    return (
      <div className="App">
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">SearchResults</h1>
            <p class="lead">Recipes for the homegrown mixologist.</p>
          </div>
        </div>

        {this.props.match.params.id}
        
        <div class="container">

        <form>
            <input type="text" name="search" placeholder="Enter a liquor or spirit" id="ingredient-search"/>
        </form>

          <button>Search by Ingredient</button>
        </div>

        <div class="search-results">

        </div>

      
      </div>
    );
  }
}

export default SearchResults;