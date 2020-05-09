import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import AuthService from "../services/authService";

class Login extends Component {
  state = {
    isLoading: false,
    hasError: false,
    errorMessage: "",
    username: "",
    password: "",
  };

  render() {
    if (AuthService.isLoggedIn()) {
      {
        const { history } = this.props;
        console.log(history);
        history.push("/", {});
      }
      // return (
      //   <Redirect
      //     to={{
      //       pathname: "/",
      //       state: { username: this.state.username },
      //     }}
      //   ></Redirect>
      // );
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
                    type="text"
                    className="form-control"
                    placeholder="Enter your username"
                    value={this.state.username}
                    onChange={(event) =>
                      this.setState({ username: event.target.value })
                    }
                  ></input>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(event) =>
                      this.setState({ password: event.target.value })
                    }
                  ></input>
                </div>

                <button
                  className="btn btn-secondary form-control"
                  onClick={this.handleLogin}
                >
                  {this.state.isLoading && (
                    <span
                      style={{ marginRight: 10 }}
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  Login
                </button>
              </form>
              {this.state.hasError && (
                <div style={{ marginTop: 3, color: "red", fontSize: 13 }}>
                  <p>* {this.state.errorMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  handleLogin = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      let result = await AuthService.login(
        this.state.username,
        this.state.password
      );

      if (result) {
        this.setState({
          errorMessage: null,
          hasError: false,
          isLoading: true,
        });
      } else {
        this.setState({
          errorMessage:
            "Login Failed! The username must be equal to the password.",
          hasError: true,
          isLoading: false,
        });
      }
    } catch (err) {
      this.setState({
        errorMessage: "An error occurred while trying to login!",
        hasError: true,
        isLoading: false,
      });
    }
  };
}

export default Login;
