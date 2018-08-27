import React from "react";
import data from "../data.json";
import mapboxgl from "mapbox-gl";
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
      style: "mapbox://styles/mapbox/streets-v9",
      center: [1, 1],
      zoom: 1.5
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="mapContainerParent">
        <div className="mapContainer" ref={el => (this.mapContainer = el)} />
      </div>
    );
  }
}
