import React from 'react';
import { Link } from "react-router-dom";
import './NavigationBar.scss';
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { ExitToApp } from "@material-ui/icons";

function NavigationBar() {
  const history = useHistory();

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
        // if authentication failed or logout succeeded redirect to login page
        if (res.message.code === 401 || res.message.code === 200) {
          history.push("/sign");
        }
        else {
          event.preventDefault();
        }
      })
      .catch(err => err);
  }

  return (
    <div className="nav-bar">
      <AppBar position="static" color="transparent">
        <Toolbar>
          <div className="nav-bar__navigation">
            <Link className="nav-bar__button" to="/">Home</Link>
            <Link className="nav-bar__button" to="/guests">Guests</Link>
            <Link className="nav-bar__button" to="/gifts">Gifts</Link>
            <Link className="nav-bar__button" to="/menu">Menu</Link>
            <Link className="nav-bar__button" to="/music">Music</Link>
          </div>
          <div className="spacing"></div>
          <IconButton onClick={logout} style={{ color: "currentcolor" }}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavigationBar;
