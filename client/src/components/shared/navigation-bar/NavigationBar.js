import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './NavigationBar.css';

function NavigationBar() {

  const [checked, setChecked] = useState(false);

  function toggleMenu() {
    setChecked(false);
  }

  function clickMenu() {
    setChecked(!checked);
  }

  return (
    <div className="nav-bar">
      <div className="nav-bar__navigation">
        <input type="checkbox" className="nav-bar__checkbox" id="nav-bar__checkbox" checked={checked} onChange={clickMenu} />
        <label htmlFor="nav-bar__checkbox" className="nav-bar__navigation__box">
          <span>&nbsp;</span>
        </label>
        <div className="nav-bar__background">&nbsp;</div>
        <div className="nav-bar__container">
          <Link className="nav-bar__button" onClick={toggleMenu} to="/">Home</Link>
          <Link className="nav-bar__button" onClick={toggleMenu} to="/guests">Guests</Link>
          <Link className="nav-bar__button" onClick={toggleMenu} to="/gifts">Gifts</Link>
          <Link className="nav-bar__button" onClick={toggleMenu} to="/menu">Menu</Link>
          <Link className="nav-bar__button" onClick={toggleMenu} to="/music">Music</Link>
          <Link className="nav-bar__button" onClick={toggleMenu} to="/login">Login</Link>
          <Link className="nav-bar__button" onClick={toggleMenu} to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
