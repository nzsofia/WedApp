import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './NavigationBar.scss';
import { useHistory } from "react-router-dom";

function NavigationBar() {

  const history = useHistory();
  const [checked, setChecked] = useState(false);

  function toggleMenu() {
    setChecked(false);
  }

  function clickMenu() {
    setChecked(!checked);
  }

  function logout(event) {
    fetch("http://localhost:9000/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        //if authentication failed or logout succeeded redirect to login page
        if (res.message.code === 401 || res.message.code === 200){
          history.push("/login");
        }
        else{
          event.preventDefault();
        }
      })
      .catch(err => err);
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
          <button className="nav-bar__button" onClick={logout} >Logout</button>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
