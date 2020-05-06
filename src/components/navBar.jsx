import React, { Component } from "react";
import ReactDOM from "react-dom";

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
              <a class="nav-item nav-link" href="#">
                Features
              </a>
              <a className="nav-item nav-link" href="#">
                Pricing
              </a>
              <a className="nav-item nav-link disabled" href="#">
                Disabled
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
