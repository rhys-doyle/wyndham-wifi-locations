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
    wifiPoints: simplifyContent(data),
    map: null
  };

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/dark-v9",
      center: [-215.3, -37.96],
      zoom: 10.5
    });

    map.on("load", () => {
      console.log("string");
      map.addSource("hotspots", { type: "geojson", data: data });
      map.addLayer({
        id: "hotspots",
        type: "circle",
        source: "hotspots",
        paint: {
          "circle-color": "#1dcead"
        }
      });
    });

    map.on("click", "hotspots", function(e) {
      var coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(e.features[0].properties.Wifi_Name)
        .addTo(map);
    });

    map.on("mouseenter", "hotspots", function() {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "hotspots", function() {
      map.getCanvas().style.cursor = "";
    });

    this.setState({
      map
    });
  }

  handleLocationClick = id => {
    console.log(id);
    // find wifi point in this.state.wifiPoints by id
    /*
    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(e.features[0].properties.Wifi_Name)
        .addTo(this.state.map);
    */
  };

  render() {
    return (
      <div className="mapAndSidebar">
        <Sidebar
          wifiPoints={this.state.wifiPoints}
          onClick={this.handleLocationClick}
        />
        <div className="mapContainerParent">
          <div className="mapContainer" ref={el => (this.mapContainer = el)} />
        </div>
      </div>
    );
  }
}
