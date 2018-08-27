import React from "react";
import data from "../data.json";

const simplifyContent = data => {
  const newData = data.features.map(obj => ({
    coordinates: obj.geometry.coordinates,
    name: obj.properties.Location,
    ssid: obj.properties.Wifi_Name,
    id: btoa(obj.geometry.coordinates[0] + obj.geometry.coordinates[1])
  }));
  return newData;
};

export default class Map extends React.Component {
  state = {
    wifiPoints: simplifyContent(data)
  };

  render() {
    console.log(this.state);
    return <div>map</div>;
  }
}
