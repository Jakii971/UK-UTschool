import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

class Menu extends Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <b>Admin - TRAVELkuy</b>
          </Link>
          <label className="menu-icon" htmlFor="menu-btn">
            <span className="navicon"></span>
          </label>
          <ul className="menu">
            <li>
              <Link to="/" className="menu-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/datakategori" className="menu-link">
                Kota Destinasi
              </Link>
            </li>
            <li>
              <Link to="/datasubkategori" className="menu-link">
                Tempat Destinasi
              </Link>
            </li>
            <li>
              <Link to="/datapaket" className="menu-link">
                Paket Destinasi
              </Link>
            </li>
            <li>
              <Link to="/datauser" className="menu-link">
                Data Customer
              </Link>
            </li>
            {/* <li>
              <Link to="/datatransaksi" className="menu-link">
                Data Transaksi
              </Link>
            </li> */}
          </ul>
        </div>
      </header>
    );
  }
}

export default Menu;
