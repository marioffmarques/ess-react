import React, { Component } from "react";
import ReactDOM from "react-dom";

class SubmitButton extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <button
            onClick={this.props.onButtonAction}
            className="btn btn-primary btn-sm m-2"
          >
            {this.props.title}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default SubmitButton;
