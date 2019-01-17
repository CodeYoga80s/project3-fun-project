// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';

// import Navigation from '../Navigation';

// const App = () => (
//   <Router>
//     <Navigation />
//   </Router>
// );

// export default App;

import React, { Component } from "react";
import logo from "../../logo.svg";
import "../../App.css";
import API from "../../utils/API";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class App extends Component {

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

        <div>
          <Link to="/">Home</Link>
          <Link to="#">Sign-Up</Link>
          <Link to="#">Favorites</Link>
        </div>

        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">IMBIBE</h1>
            <p class="lead">Drink Recipes for the Homegrown Mixologist.</p>
          </div>
        </div>

        
        <div class="container">

          <h3>Search by...</h3>

          <button>
            <Link to="/search-results/drinks">Drink Name</Link>
          </button>

          <button>
            <Link to="/search-results/ingredient">Ingredient Name</Link>
          </button>

        </div>

      
      </div>
    );
  }
}

export default App;
