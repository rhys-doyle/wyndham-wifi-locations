import React, { Component } from "react";
import "reset-css/reset.css";
import "./App.css";
import Map from "./Components/map";

class App extends Component {
  render() {
    return (
      <div className="mainContainer">
        <Map />
      </div>
    );
  }
}

export default App;
