import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import StoreHelper from "../helpers/storeHelper";

class Login extends Component {
  render() {
    if (StoreHelper.isLoggedIn()) {
      return <Redirect to="/"></Redirect>;
    }

    return (
      //history.push('/users')
      <React.Fragment>
        <div className="container h-100">
          <div className="text-center" style={{ marginTop: "70px" }}>
            <img
              src="/img/taxilogo.png"
              width="100"
              height="100"
              className="rounded mx-auto d-block"
              alt=""
            />
            <h5>Welcome to ESS Taxi App</h5>
          </div>
          <div className="col-lg-12 d-flex flex-row justify-content-center align-items-center">
            <div
              className="jumbotron"
              style={{ marginTop: "100px", width: "500px" }}
            >
              <h3>Login</h3>
              <br></br>
              <form>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  ></input>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  ></input>
                </div>

                <button
                  type="submit"
                  className="btn btn-secondary form-control"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
