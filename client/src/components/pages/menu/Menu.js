import React, { useEffect } from "react";
import './Menu.scss';
import { useHistory } from "react-router-dom";
import NavigationBar from "../../shared/navigation-bar/NavigationBar";
import * as request from "../../../services/request";

function Menu() {
  const history = useHistory();

  function authenticate() {
    request.get(`${request.URL}/menu`)
      .then(res => {
        // if authentication failed redirect to login page
        if (res.message.code === 401) {
          history.push("/sign");
        }
      })
      .catch(err => err);
  }

  // check if user is authorized to access this page
  useEffect(authenticate, []);

  return (
    <div>
      <NavigationBar />
      <div>Menu works!</div>
    </div>
  );
}

export default Menu;
