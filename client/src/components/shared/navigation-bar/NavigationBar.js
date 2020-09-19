import React from 'react';
import { Link } from "react-router-dom";
import './NavigationBar.css';

function NavigationBar() {

  return (
    <div className="nav-bar">
      <Link className="nav-bar__button" to="/">Home</Link>
      <Link className="nav-bar__button" to="/guests">Guests</Link>
      <Link className="nav-bar__button" to="/gifts">Gifts</Link>
      <Link className="nav-bar__button" to="/menu">Menu</Link>
      <Link className="nav-bar__button" to="/music">Music</Link>
      <Link className="nav-bar__button" to="/login">Login</Link>
      <Link className="nav-bar__button" to="/register">Register</Link>
    </div>
  );
}

export default NavigationBar;
