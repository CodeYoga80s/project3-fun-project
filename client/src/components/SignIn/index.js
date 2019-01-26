import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Jumbotron from "../Jumbotron";
import { SignUpLink,SignUpForm } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Modal from 'react-awesome-modal';
import "./Login.css";


const SignInPage = () => (
  <div>
    {/* <h1>SignIn</h1> */}
    <SignInForm />
   
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  visible: true
};

class SignInFormBase extends Component {
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
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.goBack();
      })
      .catch(error => {
        this.setState({ error : "Invalid Username and/or Password" });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
  <div>
      <Modal visible={this.state.visible} width="400" height="400" effect="fadeInUp" onClickAway={() => this.hideModal()}>
      <div className="ErrorMessage">{error}</div>
      <div className="Login">
      <form onSubmit={this.onSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <br></br>
            <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <br></br>
            <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={isInvalid}
            type="submit"
          >
            Login
          </Button>
          <br></br>
          <SignUpLink />
        </form>
        
    </div>
    </Modal>
    </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };