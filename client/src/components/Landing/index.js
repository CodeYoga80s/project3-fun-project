
import React, { Component } from "react";
import logo from "../Landing/imbibe_logo.png";
import "../../App.css";
import API from "../../utils/API";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from 'firebase';

import SignUp from '../SignUp';
import "./style.css";




class App extends Component {


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
          <img src={logo} style={{ height: "150px", width: "150px", textAlign: "center" }}
          className="App-logo" alt="logo"/>

            <h1  
            style={{ fontsize: 55, clear: "both", textAlign: "center" }}
    className="display-4">IMBIBE</h1>
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
