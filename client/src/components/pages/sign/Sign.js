import React, {useState, useEffect} from "react";
import './Sign.scss';
import Login from "./login/Login";
import Register from "./register/Register";
import SwipeableViews from "react-swipeable-views";
import {Tabs, Tab, AppBar, Paper} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useTheme } from '@material-ui/core/styles';
import floralBottom from "../../../assets/svg/compositions/floral-bottom-composition.svg";

function Sign(){
  const history = useHistory();
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();

  function handleTabChange (event, newIndex) {
    console.log(newIndex);
    setTabIndex(newIndex);
  };

  function authenticate() {
    fetch("http://localhost:9000/", {
      method: "GET",
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        // if alredy logged in, load home page
        if (res.message.code === 200) {
          history.push("/"); //modify to go back to the previous page
        }
      })
      .catch(err => err);
  }

  // check if user is already logged in
  useEffect(authenticate, []);


  return (
    <Paper className="sign-container">
      <div className="sign-container__decoration sign-container__decoration--top">
        <img src={floralBottom} alt="floral decoration" />
      </div>
      <div className="sign-container__decoration sign-container__decoration--left">
        <img src={floralBottom} alt="floral decoration" />
      </div>
      <AppBar position="static" color="default">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          aria-label="full width tabs"
        >
          <Tab label="Login" id="login" aria-controls="login-tab" />
          <Tab label="Register" id="register" aria-controls="register-tab" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        index={tabIndex}
      >
        <Login value={tabIndex} index={0} />
        <Register value={tabIndex} index={1} />
      </SwipeableViews>
    </Paper>
  );
}

export default Sign;
