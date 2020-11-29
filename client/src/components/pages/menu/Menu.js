import React, { useEffect } from "react";
import './Menu.scss';
import { useHistory } from "react-router-dom";
import NavigationBar from "../../shared/navigation-bar/NavigationBar";
import * as request from "../../../services/request";
import box from "../../../assets/svg/compositions/boxes/floral-box-rec-port-2.svg";

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
      <div className="menu-container">
        <img src={box} alt="Menu container" />
        <div className="menu">
          <h1 className="menu__title">Wedding Menu</h1>
          <div className="menu__dish">
            <h2 className="menu__dish__title">Starter</h2>
            <p className="menu__dish__description">Curry Roasted Parsnip Soup with Coriander and Almonds</p>
            <p className="menu__dish__description">Spring Green Salad</p>
          </div>
          <div className="menu__dish">
            <h2 className="menu__dish__title">Main dishes</h2>
            <p className="menu__dish__description">Barbecue Favorites: Fried Chicken, Mac and Cheese and Biscuits</p>
            <p className="menu__dish__description">Grilled Chicken and Cherry Tomato Skewers</p>
            <p className="menu__dish__description">Butternut Squash, Fresh Fruit and Stake</p>
          </div>
          <div className="menu__dish">
            <h2 className="menu__dish__title">Dessert</h2>
            <p className="menu__dish__description">S'mores Chocolate-Covered Marshmallows</p>
            <p className="menu__dish__description">Mousse Cups</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
