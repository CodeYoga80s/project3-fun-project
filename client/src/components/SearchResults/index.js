import React, { Component } from "react";
import logo from "../../logo.svg";
import "../../App.css";
import API from "../../utils/API";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";




class SearchResults extends Component {

  state = {
    favoritesArray: [],
    cocktailID:"",
    title: "",
    image: "",
    searchInput: ""
  };

 /*  componentDidMount() {
    this.displayRandomDrink();
  };

  displayRandomDrink = () => {
    API.getDrinksByDrink("margarita")
      .then(res =>
        this.setState({title: res.data.drinks[0].strDrink})
      )
      .catch(err => console.log(err));
  }; */

  displayDrinksByDrink = event => {
    console.log(this.state.searchInput + "search is here");
    API.getDrinksByDrink(this.state.searchInput)
      .then(res =>
        this.setState({title: res.data.drinks[0].strDrink, image: res.data.drinks[0].strDrinkThumb})
      )
      .catch(err => console.log(err));
  };

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    console.log(event.target);
    event.preventDefault();
  };

/* 
  handleChange({target}) {
    this.setState({
      title: target.value
    });
  }; */

  /*addTofavorites = event => {
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
            <input type="text" name="searchInput" placeholder="Enter here..." id="ingredient-search" value={this.state.searchInput} onChange={this.handleChange}/>
          </form>

          <button type="submit" onClick={this.displayDrinksByDrink}>Search</button>

        </div>

        <h3>Time to Mix!</h3>

        <div className="search-results">

          <img src={this.state.image} alt={this.state.title}/>
          <p className="lead">{this.state.title}</p>

          <img src="https://www.thecocktaildb.com/images/media/drink/wpxpvu1439905379.jpg" alt="Margarita"/>
          <Link to="#"><p className="lead">Margarita</p></Link>

        </div>

      
      </div>
    );
  }
}

export default SearchResults;