import React from "react";

const WifiLocation = props => {
  return (
    <a
      href=""
      className="hotspot"
      onClick={e => {
        e.preventDefault();
        props.onClick(props.id);
      }}
    >
      {props.name}
    </a>
  );
};

export default WifiLocation;
