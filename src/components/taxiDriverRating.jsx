import React, { Component } from "react";
import TaxiDriverInfo from "./taxiDriverInfo";

import TripService from "../services/tripService";

class TaxiDriverRating extends Component {
  state = {
    taxiDriver: this.props.taxiDriver,
    selectedRating: 1,
    ratingComment: "",
    hasError: false,
    errorMessage: "",
    ratingSent: false,
  };
  render() {
    return (
      <React.Fragment>
        {(this.state.hasError || this.state.ratingSent) && (
          <div
            className={`alert ${
              this.state.hasError ? "alert-danger" : "alert-success"
            }`}
            role="alert"
          >
            {this.state.hasError
              ? this.state.errorMessage
              : "Thanks! Your rate was sent."}
          </div>
        )}

        <div>
          <div className="container">
            <div className="col-lg-12 d-flex flex-row justify-content-center align-items-center">
              <div
                className="jumbotron"
                style={{ marginTop: "100px", width: "95%" }}
              >
                <TaxiDriverInfo
                  driverName={this.state.taxiDriver.name}
                  rating={this.state.taxiDriver.rating}
                  isDriving={false}
                />
                <hr />
                <h5>
                  <strong>How do you rate him?</strong>
                </h5>

                <textarea
                  value={this.state.ratingComment}
                  disabled={this.state.ratingSent}
                  placeholder="Comment your experience"
                  onChange={(evt) => {
                    this.setState({
                      ratingComment: evt.target.value,
                    });
                  }}
                  id="form17"
                  className="md-textarea form-control"
                  rows="3"
                ></textarea>
                <div style={{ padding: "10px" }}>
                  <span
                    disabled={this.state.ratingSent}
                    onClick={() => this.selectRating(1)}
                    className={`fa fa-star ${
                      this.state.selectedRating > 0 && "checkedRating"
                    }`}
                  ></span>
                  <span
                    disabled={this.state.ratingSent}
                    onClick={() => this.selectRating(2)}
                    className={`fa fa-star ${
                      this.state.selectedRating > 1 && "checkedRating"
                    }`}
                  ></span>
                  <span
                    disabled={this.state.ratingSent}
                    onClick={() => this.selectRating(3)}
                    className={`fa fa-star ${
                      this.state.selectedRating > 2 && "checkedRating"
                    }`}
                  ></span>
                  <span
                    disabled={this.state.ratingSent}
                    onClick={() => this.selectRating(4)}
                    className={`fa fa-star ${
                      this.state.selectedRating > 3 && "checkedRating"
                    }`}
                  ></span>
                  <span
                    disabled={this.state.ratingSent}
                    onClick={() => this.selectRating(5)}
                    className={`fa fa-star ${
                      this.state.selectedRating > 4 && "checkedRating"
                    }`}
                  ></span>
                </div>

                <button
                  type="button"
                  disabled={this.state.ratingSent}
                  className="btn btn-rounded waves-effect btn-outline-info"
                  style={{ width: "35%", marginTop: "10px" }}
                  onClick={this.sendRating}
                >
                  <i className="fas fa-paper-plane pr-2" aria-hidden="true"></i>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  selectRating = (value) => {
    if (this.state.ratingSent) {
      return;
    }
    this.setState({ selectedRating: value });
  };

  sendRating = async () => {
    try {
      this.setState({
        hasError: false,
        errorMessage: "",
        ratingSent: false,
      });

      await TripService.sendRating(
        this.state.taxiDriver,
        this.state.selectedRating,
        this.state.ratingComment
      );

      this.setState({
        ratingSent: true,
      });
    } catch (err) {
      this.setState({
        errorMessage: `An error occurred while sending the Rate! ${err.message}`,
        hasError: true,
      });
    }
  };
}

export default TaxiDriverRating;
