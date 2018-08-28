import React from "react";
import data from "../data.json";
import mapboxgl from "mapbox-gl";
import Sidebar from "./sidebar";
import "./map.css";

const simplifyContent = data => {
  const newData = data.features.map(obj => ({
    coordinates: obj.geometry.coordinates,
    name: obj.properties.Location,
    ssid: obj.properties.Wifi_Name,
    id: btoa(obj.geometry.coordinates[0] + obj.geometry.coordinates[1])
  }));
  return newData;
};

mapboxgl.accessToken =
  "pk.eyJ1Ijoicmh5cy0tIiwiYSI6ImNqbGJ2aDNzNDJya24zd3E4Yjg1dGswbHEifQ.OBOUcCT7jvj3dE8AifzbBw";

export default class Map extends React.Component {
  state = {
    wifiPoints: simplifyContent(data)
  };

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/dark-v9",
      center: [-215.3, -37.96],
      zoom: 10.5
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="mapAndSidebar">
        <Sidebar wifiPoints={this.state.wifiPoints} />
        <div className="mapContainerParent">
          <div className="mapContainer" ref={el => (this.mapContainer = el)} />
        </div>
      </div>
    );
  }
}
