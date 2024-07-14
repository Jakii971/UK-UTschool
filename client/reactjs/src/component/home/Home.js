import React, { Component } from "react";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="container-fluid bg-image">
        <div className="container d-flex justify-content-center align-items-center text-content">
          <div style={{ marginBlock: "auto", paddingTop: 340 }}>
            <h1 style={{ fontSize: 90, fontWeight: "bold" }}>Hello min!!</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
