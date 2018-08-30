import React from "react";
import "./sidebar.css";
import WifiLocation from "./wifiLoaction";

const Sidebar = props => {
  return (
    <div className="sideBar">
      <h1 className="title">Wyndham City Coucil Wi-Fi Locations</h1>
      <div className="wyndhamLocations">
        {props.wifiPoints.map((hotspot, index) => {
          return (
            <WifiLocation
              ssid={hotspot.ssid}
              marker={props.marker}
              key={hotspot.id}
              index={index}
              name={hotspot.name}
              onClick={props.onClick}
              id={hotspot.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
{
  /* <a
href=""
className={
  props.locations.isSelected
    ? `${props.locations.name} selected`
    : props.locations.name
}
>
{props.locations.name}
</a> */
}
