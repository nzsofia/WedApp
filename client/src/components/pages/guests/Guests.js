import React, { useState, useEffect } from "react";
import './Guests.scss';
import { useHistory } from "react-router-dom";
import NavigationBar from "../../shared/navigation-bar/NavigationBar";
import { List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function Guests() {
  const history = useHistory();
  const [guests, setGuests] = useState({list: []});

  function getGuests() {
    fetch("http://localhost:9000/guests", {
      method: "GET",
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        // if authentication failed redirect to login page
        if (res.message.code === 401) {
          history.push("/login");
        }
        else if (res.message.code === 200) {
          setGuests({list: res.guestList});
        }
      })
      .catch(err => err);
  }

  useEffect(getGuests, []);

  return (
    <div>
      <NavigationBar />
      <div className="guest-list-container">
        <List className="guest-list">
          {guests.list.map(guest =>
            <ListItem key={guest._id} className="guest-list__item">
              <ListItemText primary={guest.lName + " " + guest.fName} />
            </ListItem>
          )}
        </List>
        <div className="guest-list-container__decoration">&nbsp;</div>
      </div>
    </div>
  );
}

export default Guests;
