import React, { Component } from "react";
import "reset-css/reset.css";
import "./App.css";
import SideBar from "./Components/sidebar";
import Map from "./Components/map";

class App extends Component {
  render() {
    return (
      <div className="mainContainer">
        <SideBar />
        <Map />
      </div>
    );
  }
}

export default App;
