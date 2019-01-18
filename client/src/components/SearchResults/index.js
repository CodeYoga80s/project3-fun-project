import React, { Component } from "react";
import logo from "../../logo.svg";
import "../../App.css";
import API from "../../utils/API";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";




class SearchResults extends Component {

  /* componentDidMount() {
    API.getRandomDrink();
  } */

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

  // How to get ID
  /* {this.props.match.params.id} */


  render() {
    return (
      <div className="App">

        <div>
          <Link to="/">Home</Link>
          <Link to="#">Sign-Up</Link>
          <Link to="#">Favorites</Link>
        </div>

        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Recipe Results</h1>
            <p className="lead">Now Mix It, Mix It Real Good.</p>
          </div>
        </div>

        {/* {this.props.match.params.id} */}
        
        <div className="container">

          <h3>What can I get for you?</h3>

          <form>
            <input type="text" name="search" placeholder="Enter here..." id="ingredient-search"/>
          </form>

          <button>Search</button>

        </div>

        <h3>Time to Mix!</h3>

        <div className="search-results">

          <img src="https://www.thecocktaildb.com/images/media/drink/wpxpvu1439905379.jpg" alt="Margarita"/>
          <Link to="#"><p className="lead">Margarita</p></Link>

        </div>

      
      </div>
    );
  }
}

export default SearchResults;