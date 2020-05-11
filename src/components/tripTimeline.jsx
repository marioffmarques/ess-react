import React from "react";

const TripTimeline = (props) => {
  return (
    <React.Fragment>
      <ul className="timeline">
        {props.points.map((item, index) => (
          <li key={index} className="completed">
            {props.currentPoint == index ? (
              <span>
                <h6>
                  <strong>{item}</strong>{" "}
                  <i className="fas fa-car-side pr-2" aria-hidden="true"></i>
                </h6>
              </span>
            ) : (
              <p
                className={`
                ${index < props.currentPoint && "timelineItemCompleted"}
                `}
              >
                {item}
              </p>
            )}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default TripTimeline;
