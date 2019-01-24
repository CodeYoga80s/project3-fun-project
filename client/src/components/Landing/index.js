
import React, { Component } from "react";
import logo from "../../logo.svg";
import "../../App.css";
import API from "../../utils/API";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from 'firebase';

import SignUp from '../SignUp';
import "./style.css";



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

  componentDidMount() {
    this.setAuthObserver();
    var user = firebase.auth().currentUser;
    if (user) {
        // User is signed in.
        API.getUser(user.email)
        .then(res => console.log(res.data[0]._id))
        .catch(err => console.log(err));
        console.log(user.email);
      } else {
        // No user is signed in.
        console.log("user is null value");
      }


  }

  setAuthObserver () {
    return firebase.auth().onAuthStateChanged(user => this.setState({ user }));
    
}


componentWillUnmount() {
    
  }


  render() {
    return (
      <div className="App">

        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">IMBIBE</h1>
            <p className="lead">Drink Recipes for the Homegrown Mixologist.</p>
          </div>
        </div>

        
        <div className="container">

          <h3>Search by...</h3>
            <div>
              <button>
                <Link to="/search-results/drinks">Drink Name</Link>
              </button>
            </div>
              <div>

              <button>
                <Link to="/search-results/ingredient">Ingredient Name</Link>
              </button>
              </div>
        </div>

      
      </div>
    );
  }
}

export default App;
