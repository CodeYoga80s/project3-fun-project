import React from 'react';

import { withFirebase } from '../Firebase';
import { Link } from "react-router-dom";

const SignOutButton = ({ firebase }) => (
  // <button type="button" onClick={firebase.doSignOut}>
  //   Sign Out
  // </button>
  <Link className="navbar-brand" to="/" onClick={firebase.doSignOut}>
  Sign Out
</Link>
);

export default withFirebase(SignOutButton);