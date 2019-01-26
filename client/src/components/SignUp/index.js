import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Jumbotron from "../Jumbotron";
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Modal from 'react-awesome-modal';
import "./SignUp.css";
import API from "../../utils/API";

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
    this.props.history.goBack();
  };

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.addNewUser();
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.goBack();
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addNewUser = event => {
    
    API.addUser({userID: this.state.email})
    .then(res => console.log(res))
    .catch(err => console.log(err));

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
        <Modal visible={this.state.visible} width="400" height="400" effect="fadeInUp" onClickAway={() => this.hideModal()}>
        <div className="SignUp">
      <form onSubmit={this.onSubmit}>

      <FormGroup controlId="username" bsSize="large">
        <ControlLabel>Email</ControlLabel>
        <br></br>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="First Name"
        />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <br></br>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </FormGroup>
        <FormGroup controlId="passwordOne" bsSize="large">
        <ControlLabel>Password</ControlLabel>
        <br></br>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        </FormGroup>
          {/* <Button
            block
            bsSize="large"
            disabled={isInvalid}
            type="submit"
          >
            Sign Up
          </Button> */}
          <br></br>

          {error && <p>{error.message}</p>}

          <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

      </form>
      </div>
      </Modal>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p className="p-signup">
    Don't have an account? <Link to="/signup">Sign Up</Link>
  </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
export { SignUpForm, SignUpLink };