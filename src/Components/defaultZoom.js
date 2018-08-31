import React from "react";

const DefaultZoom = props => {
  return (
    <button className="default" onClick={props.handleButton}>
      Initial View
    </button>
  );
};

export default DefaultZoom;
