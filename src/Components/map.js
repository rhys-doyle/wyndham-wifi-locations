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
    map: null,
    storedPopup: null
  };

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/dark-v9",
      center: [-215.32, -37.875],
      zoom: 11.2
    });

    map.on("load", () => {
      console.log("string");
      map.addSource("hotspots", { type: "geojson", data: data });
      map.addLayer({
        id: "hotspots",
        type: "circle",
        source: "hotspots",
        paint: {
          "circle-color": "#1dcead",
          "circle-blur": 1.5,
          "circle-radius": 12
        }
      });
    });

    map.on("click", "hotspots", e => {
      var coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(
          `<span>${e.features[0].properties.Location}<br><span>SSID: ${
            e.features[0].properties.Wifi_Name
          }</span></span>`
        )
        .addTo(map);

      map.easeTo({
        center: coordinates,
        zoom: 13,
        duration: 1600
      });
    });

    map.on("mouseenter", "hotspots", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "hotspots", () => {
      map.getCanvas().style.cursor = "";
    });

    this.setState({
      map
    });
  }

  handleLocationClick = id => {
    const popupElem = document.getElementsByClassName("mapboxgl-popup")[0];
    if (this.state.storedPopup && popupElem) {
      popupElem.remove();
    }

    const points = this.state.wifiPoints.find(obj => obj.id === id);

    let popup = new mapboxgl.Popup({
      closeButton: false,
      offset: 5,
      anchor: "bottom"
    })
      .setLngLat(points.coordinates)
      .setHTML(
        `<span>${points.name}<br><span>SSID: ${points.ssid}</span></span>`
      )
      .addTo(this.state.map);

    const storedPopup = {
      id: points.id
    };

    this.setState({ storedPopup: storedPopup });
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
