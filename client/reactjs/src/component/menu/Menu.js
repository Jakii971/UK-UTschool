import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

class Menu extends Component {
  render() {
    return (
      <div>
        <header className="header ">
          <a href="https://www.akscoding.com" className="logo">
            <b>CRUD</b>
          </a>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" for="menu-btn">
            <span className="navicon"></span>
          </label>
          <ul className="menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/datakategori">Kategori Destinasi</Link>
            </li>
            <li>
              <Link to="/datasubkategori">Subkategori Destinasi</Link>
            </li>
            <li>
              <Link to="/datapaket">Paket Destinasi</Link>
            </li>
            <li>
              <Link to="/datauser">User</Link>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}
export default Menu;
