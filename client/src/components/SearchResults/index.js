import React, { Component } from "react";
import logo from "../../logo.svg";
import "../../App.css";
import API from "../../utils/API";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Row from "../Row";
import Col from "../Col";
import Card from "../Card";
import firebase from 'firebase';
import SignIn from "../SignIn";
import Modal from 'react-awesome-modal';
import Favorite from "../Favorite"

{/*image: "",*/}
{/*, title: res.data.drinks.strDrink, image: res.data.drinks.strDrinkThumb, idDrink: res.data.drinks.idDrink*/}
{/*{title: res.data.drinks[0].strDrink, image: res.data.drinks[0].strDrinkThumb}*/}

class SearchResults extends Component {

  state = {
    favoritesArray: [],
    userID:"",
    drinks: [],
    title: "",
    idDrink: "",
    searchInput: "",
    isModalOpen: false,
    noRecipes: false
  };

  componentDidMount() {
    console.log(this.state.isModalOpen);
    this.displayRandomDrink();
    this.checkUser();
     
  };

  checkUser = () => {
    this.setAuthObserver();
    var user = firebase.auth().currentUser;
    if (user) {
        // User is signed in.
        API.getUser(user.email)
        .then(res => this.setState({userID : res.data[0]._id}))
        .catch(err => console.log(err));
        console.log(user.email);
      } else {
        // No user is signed in.
        console.log("user is null value");
      }
  };

  displayRandomDrink = () => {
    API.getRandomDrink()
      .then(res =>
        this.setState({drinks: res.data.drinks})
      )
      .catch(err => console.log(err));
  };

  chooseSearch = () => {
    if (this.props.match.params.id === "drinks") {
      this.displayDrinksByDrink();
    }
    else {
      this.displayDrinksByIngredient();
    }
  };

  displayDrinksByDrink = () => {
    console.log(this.state.searchInput + "search is here");
      API.getDrinksByDrink(this.state.searchInput)
      .then(res =>
        this.setState({drinks: res.data.drinks})
      )
      .catch(err => console.log(err));
  };

  displayDrinksByIngredient = () => {
    API.getDrinksByIngredient(this.state.searchInput)
      .then(res =>
        this.setState({drinks: res.data.drinks})
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

  setAuthObserver () {
    return firebase.auth().onAuthStateChanged(user => this.setState({ user }));
    
  }

  addTofavorites = event => {
    // event.preventDefault();
    this.checkUser();
    if(this.state.userID){
    console.log(event);
    API.updateUser(this.state.userID,{cocktailID: event})
    .then(res => console.log(res))
    .catch(err => console.log(err)); }
    else{
      this.openModal();

    }
  
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
/* 
  handleChange({target}) {
    this.setState({
      title: target.value
    });
  }; */


  // How to get ID
  /* {this.props.match.params.id} */


  render() {
    /* console.log("this.state.drinks = " + this.state.drinks);
    console.log("this.state.drinks.length = " + this.state.drinks.length); */
    return (
      <div className="App">

        <div>
          <Link to="/">Home</Link>
          <Link to="#">Sign-Up</Link>
          <Link to="/favorites">Favorites</Link>
        </div>

        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Recipe Results</h1>
            <p className="lead">Now Mix It, Mix It Real Good.</p>
          </div>
        </div>

        {/* {this.props.match.params.id} */}
        
        <div className="container">

       <Modal visible={this.state.isModalOpen} width="400" height="400" effect="fadeInUp" onClickAway={() => this.closeModal()}><SignIn ></SignIn> </Modal> 

          <h3>What can I get for you?</h3>

          <form>
            <input type="text" name="searchInput" placeholder="Enter here..." id="ingredient-search" value={this.state.searchInput} onChange={this.handleChange}/>
          </form>

          <button type="submit" onClick={this.chooseSearch}>Search</button>

        </div>

        {this.state.noRecipes ? (
          <h3>Sorry there are no recipes matching that, so try this <br/> fun random recipe instead!</h3>
        ) : (
          <h3>Time to Mix!</h3>
        )}

        <div className="search-results">

          {this.state.drinks == null ? (
            <div>
              {this.state.noRecipes = true}
              {this.displayRandomDrink()}
            </div>
          ) : (
            <Row>
              <Col size="md-12">
                {this.state.noRecipes = false}
                {this.state.drinks.map(drink => (
                  <Card
                    setDrink={this.setDrink}
                    key={drink.idDrink}
                    title={drink.strDrink}
                    image={drink.strDrinkThumb}
                    id={drink.idDrink}
                    handleClick={this.addTofavorites}
                  />
                ))}
              </Col>
            </Row>     
          )}
        </div>

      </div>
    );
  }
}

export default SearchResults;