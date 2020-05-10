import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import StoreHelper from "../helpers/storeHelper";

const NavBar = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand">
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

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink
              to="/"
              className="nav-item nav-link active"
              onClick={() => window.location.reload(false)}
            >
              Home
            </NavLink>
            <span className="sr-only">(current)</span>
          </div>
        </div>
        <span
          className="navbar-brand mb-2"
          style={{ fontSize: 17, marginTop: 10, color: "#B8B8B8" }}
        >
          Hello {props.loggedInUser ?? StoreHelper.getObject("user")}
          <button
            type="button"
            className="btn btn-link"
            style={{ backgroundColor: "transparent" }}
            onClick={props.handleLogout}
          >
            <span className="navbar-toggler-icon">
              <img
                src="/img/logout.png"
                width="20"
                height="20"
                style={{ marginTop: -10 }}
              ></img>
            </span>
          </button>
        </span>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
