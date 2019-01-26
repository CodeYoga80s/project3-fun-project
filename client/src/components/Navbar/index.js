import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import SignOutButton from '../SignOut';
import SignInPage from '../SignIn';



// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar({ authUser }){
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Imbibe
      </Link>
      <div>
        <ul className="navbar-nav">
          <li className="nav-item">
 
          </li>
          <li className="nav-item">
            {/* <Link
              to="/signup"
              className={window.location.pathname === "/signup" ? "nav-link active" : "nav-link"}
            >
              Sign Up
            </Link> */}
            <div>{authUser ? <SignOutButton /> : <Link
              to="/signin"
              className={window.location.pathname === "/" ? "nav-link active navbar-brand" : "nav-link navbar-brand"}
            >
              Sign In
            </Link>}</div>

          </li>
          <li className="nav-item">
            <Link
              to="/favorites"
              className={window.location.pathname === "/favorites" ? "nav-link active navbar-brand" : "nav-link navbar-brand"}
            >
              Favorites
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;