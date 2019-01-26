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

{/*image: "",*/}
{/*, title: res.data.drinks.strDrink, image: res.data.drinks.strDrinkThumb, idDrink: res.data.drinks.idDrink*/}
{/*{title: res.data.drinks[0].strDrink, image: res.data.drinks[0].strDrinkThumb}*/}
// this.setState({userID : res.data[0]._id,favoritesArray : res})

class Favorite extends Component {

  state = {
    favoritesArray:[],
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
    // console.log(this.state.isModalOpen);
    // this.displayRandomDrink();
     this.checkUser();
     //this.displayDrinkById();
      
    
  };

  checkUser = () => {
    this.setAuthObserver();
    var user = firebase.auth().currentUser;
    if (user) {
        // User is signed in.
        API.getUser(user.email)
        .then(res => {this.setState({userID : res.data[0]._id,favoritesArray : res.data[0].favorites}); this.getFavorites();})
        .catch(err => console.log(err));

        this.setState(this.state.favoritesArray.split);
        

      } else {
        // No user is signed in.
        console.log("user is null value");
        this.openModal();
      }


    //   this.displayDrinkById();
      
  };

//   displayRandomDrink = () => {
//     API.getRandomDrink()
//       .then(res =>
//         this.setState({drinks: res.data.drinks})
//       )
//       .catch(err => console.log(err));
//   };

displayDrinkById = event => {
    this.openDetailModal();
    API.getDrinkById(event)
    .then(res =>
        this.setState({details: res.data.drinks})
      )
      .catch(err => console.log(err));
  };


  displayFavDrinksById = event => {
      console.log("passed in event" + event);
    API.getDrinkById(event)
    .then(res =>
        this.setState({drinks: this.state.drinks.concat(res.data.drinks)})
      )
      .catch(err => console.log(err));
      console.log(this.state.drinks);
  };
//   chooseSearch = () => {
//     if (this.props.match.params.id === "drinks") {
//       this.displayDrinksByDrink();
//     }
//     else {
//       this.displayDrinksByIngredient();
//     }
//   };

//   displayDrinksByDrink = () => {
//     console.log(this.state.searchInput + "search is here");
//       API.getDrinksByDrink(this.state.searchInput)
//       .then(res =>
//         this.setState({drinks: res.data.drinks})
//       )
//       .catch(err => console.log(err));
//   };

//   displayDrinksByIngredient = () => {
//     API.getDrinksByIngredient(this.state.searchInput)
//       .then(res =>
//         this.setState({drinks: res.data.drinks})
//       )
//       .catch(err => console.log(err));
//   };



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

//   addTofavorites = event => {
//     // event.preventDefault();
//     this.checkUser();
//     if(this.state.userID){
//     console.log(event);
//     API.updateUser(this.state.userID,{cocktailID: event})
//     .then(res => console.log(res))
//     .catch(err => console.log(err)); }
//     else{
//       this.openModal();

//     }
  
//   };

 getFavorites = () => {
           for(var i = 0; i< this.state.favoritesArray.length;i++){
          console.log("liked drink ids" + this.state.favoritesArray[i]);
          this.displayFavDrinksById(this.state.favoritesArray[i]);
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

/* 
  handleChange({target}) {
    this.setState({
      title: target.value
    });
  }; */


  // How to get ID
  /* {this.props.match.params.id} */


  render() {
    // console.log(this.state.drinks);
            console.log(this.state.userID);
            
    return (
      <div className="App">

  

        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Recipe Results</h1>
            <p className="lead">Now Mix It, Mix It Real Good.</p>
          </div>
        </div>

        {/* {this.props.match.params.id} */}
        
        <div className="container">

       <Modal visible={this.state.isModalOpen} width="400" height="400" effect="fadeInUp" onClickAway={() => this.closeModal()}><SignIn ></SignIn> </Modal> 
       <Modal className="detail-modal" visible={this.state.isDetailModalOpen} width="400" height="0" effect="fadeInUp" onClickAway={() => this.closeDetailModal()}> 
        <div  className="modal-content">
          {this.state.details.map(detail => (
            <div>
              <img className="recipe-thumb" src={detail.strDrinkThumb} alt={detail.strDrink}/>
              <h1>{detail.strDrink}</h1>
              <p><b>Alcoholic/Non-Alcoholic: </b>{detail.strAlcoholic}</p>
              <p><b>Glass: </b>{detail.strGlass}</p>
              <p><b>Instructions: </b>{detail.strInstructions}</p>
              <p><b>Ingredients: </b></p>
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

            </div>
          ))}
        </div>
       </Modal>

          <h3>Favorites</h3>

          {/* <form>
            <input type="text" name="searchInput" placeholder="Enter here..." id="ingredient-search" value={this.state.searchInput} onChange={this.handleChange}/>
          </form>

          <button type="submit" onClick={this.chooseSearch}>Search</button>

       

        <h3>Time to Mix!</h3> */}

        </div>

        <div className="favorites">

          <Row>
            <Col size="md-12">
              {this.state.drinks.map(drink => (
                <Card
                  setDrink={this.setDrink}
                  key={drink.idDrink}
                  title={drink.strDrink}
                  image={drink.strDrinkThumb}
                  id={drink.idDrink}
                  displayDrinkById={this.displayDrinkById}

                  
                />
              ))}
            </Col>
          </Row>     

        </div>

      </div>
    );
  }
}

export default Favorite;