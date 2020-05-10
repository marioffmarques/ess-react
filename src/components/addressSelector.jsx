import React, { Component } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import AddressService from "../services/addressService";

class AddressSelector extends Component {
  state = {
    availableDestinations: this.props.availableDestinations,
    selectedDestination: -1,
    isPriceLoading: false,
    isStartingTrip: false,
    priceForTrip: null,
    errorMessage: "",
    hasError: false,
  };

  render() {
    return (
      <React.Fragment>
        {this.state.hasError && (
          <div className="alert alert-danger" role="alert">
            {this.state.errorMessage}
          </div>
        )}
        <div>
          <div className="container">
            <div className="col-lg-12 d-flex flex-row justify-content-center align-items-center">
              <div
                className="jumbotron"
                style={{ marginTop: "100px", width: "95%" }}
              >
                <h3>Which one is your destination ?</h3>
                <div className="list-group">
                  {this.state.availableDestinations.map((dest, index) => (
                    <li
                      className={`list-group-item list-group-item-action ${
                        this.state.selectedDestination == index && "active"
                      }`}
                      onClick={() => this.getPriceForDestination(index)}
                      key={dest.label}
                    >
                      {dest.label}

                      {this.state.isPriceLoading &&
                        this.state.selectedDestination == index && (
                          <span
                            style={{ marginLeft: 10 }}
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                    </li>
                  ))}
                </div>

                {this.state.priceForTrip && !this.state.isPriceLoading && (
                  <span>
                    <hr></hr>
                    <h5>
                      <strong>This is the price for your trip</strong>
                    </h5>
                    <p>
                      {
                        this.state.availableDestinations[
                          this.state.selectedDestination
                        ].label
                      }
                    </p>
                    <p style={{ marginTop: "-15px" }}>
                      <strong>{`${this.state.priceForTrip.price} ${this.state.priceForTrip.currency}`}</strong>
                    </p>

                    <button
                      type="button"
                      disabled={this.state.isStartingTrip}
                      className="btn btn-rounded waves-effect btn-outline-info"
                      style={{ width: "35%", marginTop: "10px" }}
                      onClick={this.startTheTrip}
                    >
                      {this.state.isStartingTrip ? (
                        <span
                          style={{ marginRight: 10 }}
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <i
                          className="fas fa-car-side pr-2"
                          aria-hidden="true"
                        ></i>
                      )}
                      Call the taxi
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  getPriceForDestination = async (index) => {
    if (this.state.isPriceLoading || this.state.isStartingTrip) {
      return;
    }

    try {
      this.setState({
        selectedDestination: index,
        isPriceLoading: true,
        priceForTrip: null,
      });

      var price = await AddressService.getPriceForDestination(
        this.state.availableDestinations[index]
      );

      this.setState({
        hasError: false,
        errorMessage: "",
        priceForTrip: price,
        isPriceLoading: false,
      });
    } catch (err) {
      this.setState({
        selectedDestination: -1,
        isPriceLoading: false,
        errorMessage: `An error occurred while the price has been calculated! ${err.message}`,
        hasError: true,
      });
    }
  };

  startTheTrip = async () => {
    this.setState({ isStartingTrip: true });
  };
}

export default AddressSelector;
