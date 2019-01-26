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
import './style.css'

class SearchResults extends Component {

  state = {
    favoritesArray: [],
    userID:"",
    drinks: [],
    title: "",
    idDrink: "",
    searchInput: "",
    isModalOpen: false,
    noRecipes: false,
    details: [],
    isDetailModalOpen: false
  };

  componentDidMount() {
    console.log(this.state.isModalOpen);
    console.log("this.isDetailModalOpen = " + this.isDetailModalOpen);
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

  displayDrinkById = event => {
    this.openDetailModal();
    API.getDrinkById(event)
    .then(res =>
        this.setState({details: res.data.drinks})
      )
      .catch(err => console.log(err));
  };

  setAuthObserver () {
    return firebase.auth().onAuthStateChanged(user => this.setState({ user }));
    
  }

  addTofavorites = event => {
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

  openDetailModal = () => {
    this.setState({ isDetailModalOpen: true });
  };

  closeDetailModal = () => {
    this.setState({ isDetailModalOpen: false });
  };

  render() {
    console.log("this.state.details = " + this.state.details);
    return (
      <div className="App">

        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Recipe Results</h1>
            <p className="lead">Now Mix It, Mix It Real Good.</p>

            <h3>What can I get for you?</h3>
            <form>
              <input type="text" name="searchInput" placeholder="Enter here..." id="ingredient-search" value={this.state.searchInput} onChange={this.handleChange}/>
            </form>

            <button type="submit" onClick={this.chooseSearch}>Search</button>

          </div>
        </div>

        <div className="container">

       <Modal className="sign-in-modal" visible={this.state.isModalOpen} width="400" height="400" effect="fadeInUp" onClickAway={() => this.closeModal()}><SignIn ></SignIn> </Modal> 

       <Modal className="detail-modal" visible={this.state.isDetailModalOpen} width="600" height="0" effect="fadeInUp" onClickAway={() => this.closeDetailModal()}> 
        <div  className="modal-content">
          {this.state.details.map(detail => (
            <div className="modal-position">
              <img className="recipe-thumb .d-md-none .d-lg-block" src={detail.strDrinkThumb} alt={detail.strDrink}/>
              <h2>{detail.strDrink}</h2>
              <p className="p-details">{detail.strAlcoholic}</p>
              <p className="p-details"><b>Glass: </b>{detail.strGlass}</p>
              <p className="p-details"><b>Instructions: </b>{detail.strInstructions}</p>
              <p className="p-details"><b>Ingredients: </b></p>
              <ul>
                <li>{detail.strMeasure1}{detail.strIngredient1}</li>
                <li>{detail.strMeasure2}{detail.strIngredient2}</li>
                <li>{detail.strMeasure3}{detail.strIngredient3}</li>
                <li>{detail.strMeasure4}{detail.strIngredient4}</li>
                <li>{detail.strMeasure5}{detail.strIngredient5}</li>
                <li>{detail.strMeasure6}{detail.strIngredient6}</li>
                <li>{detail.strMeasure7}{detail.strIngredient7}</li>
                <li>{detail.strMeasure8}{detail.strIngredient8}</li>
                <li>{detail.strMeasure9}{detail.strIngredient9}</li>
                <li>{detail.strMeasure10}{detail.strIngredient10}</li>
                <li>{detail.strMeasure11}{detail.strIngredient11}</li>
                <li>{detail.strMeasure12}{detail.strIngredient12}</li>
                <li>{detail.strMeasure13}{detail.strIngredient13}</li>
                <li>{detail.strMeasure14}{detail.strIngredient14}</li>
                <li>{detail.strMeasure15}{detail.strIngredient15}</li>
              </ul>
              <button type="submit" value = {detail.idDrink} onClick={this.addTofavorites}>Add To Favorites</button>
            </div>
          ))}
        </div>
       </Modal>

        </div>

        {this.state.noRecipes ? (
          <h3>Sorry there are no recipes matching that, so try this <br/> fun random recipe instead!</h3>
        ) : (
          <h3>Time to Mix!</h3>
        )}

        <div className="search-results d-flex justify-content-center">

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
                    displayDrinkById={this.displayDrinkById}
              
                  />
                ))
                }
              </Col>
            </Row>     
          )}
        </div>

      </div>
    );
  }
  
}

export default SearchResults;