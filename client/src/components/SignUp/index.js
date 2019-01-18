import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Jumbotron from "../Jumbotron";
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Modal from 'react-awesome-modal';
import "./SignUp.css";

const SignUpPage = () => (
  <div>
    {/* <h1>SignUp</h1> */}
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  visible: true
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  hideModal = () => {
    this.setState({ visible: false });
  };

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
        <div>
        <Jumbotron>
        <h1 className="display-4">IMBIBE</h1>
        <p className="lead">Recipes for the homegrown mixologist.</p>
        </Jumbotron>
        <Modal visible={this.state.visible} width="400" height="400" effect="fadeInUp" onClickAway={() => this.hideModal()}>
        <div className="SignUp">
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="First Name"
        />
        <br></br>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <br></br>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <br></br>
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
      </div>
      </Modal>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink };