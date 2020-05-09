import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            <img
              src="/img/taxilogo.png"
              width="60"
              height="60"
              className="d-inline-block align-top"
              alt=""
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* <li><Link to="/public">Public Page</Link></li> */}
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active">
                <NavLink to="/">Home</NavLink>
                <span className="sr-only">(current)</span>
              </a>
              <a className="nav-item nav-link">
                <NavLink to="/about">About</NavLink>
              </a>
            </div>
          </div>
          <span className="navbar-brand mb-0">Hello User</span>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
