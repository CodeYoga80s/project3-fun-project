import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import API from "./utils/API";




class App extends Component {

  state = {
    favoritesArray: [],
    cocktailID:""
  };


  addTofavorites = event => {
    event.preventDefault();
    console.log(event.target.value);
    API.saveFavorite({cocktailID: event.target.value})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  
  };




  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
        <button value={1} className="btn btn-success" onClick={this.addTofavorites}> Add favorite
          
          </button> 
        </p>
      </div>
    );
  }
}

export default App;
