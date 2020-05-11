import React from "react";

const TaxiDriverInfo = (props) => {
  return (
    <React.Fragment>
      <h4>
        {props.isDriving
          ? "Driver is on his way to meet you..."
          : "The driver has reach you!"}
      </h4>
      <div>
        <i className="fas fa-car-side pr-2" aria-hidden="true"></i>
        {props.driverName}
        <span style={{ paddingLeft: "10px" }}>
          <span
            className={`fa fa-star ${props.rating > 0 && "checked"}`}
          ></span>
          <span
            className={`fa fa-star ${props.rating > 1 && "checked"}`}
          ></span>
          <span
            className={`fa fa-star ${props.rating > 2 && "checked"}`}
          ></span>
          <span
            className={`fa fa-star ${props.rating > 3 && "checked"}`}
          ></span>
          <span
            className={`fa fa-star ${props.rating > 4 && "checked"}`}
          ></span>
        </span>
      </div>
    </React.Fragment>
  );
};

export default TaxiDriverInfo;
