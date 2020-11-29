import React, { useState, useEffect } from "react";
import './Guests.scss';
import { useHistory } from "react-router-dom";
import NavigationBar from "../../shared/navigation-bar/NavigationBar";
import { List, TextField, Typography } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as request from "../../../services/request";

function Guests() {
  const history = useHistory();

  //STATES
  const [guests, setGuests] = useState({list: []});
  const [filterWord, setFilterWord] = useState("");

  const [fullGuestList, setFullGuestList] = useState([]);

  function filterGuests(event){
    let searchWord = event.target.value;
    setFilterWord(searchWord);
    searchWord = searchWord.toLowerCase();

    setGuests({list: fullGuestList.filter(guest =>
      guest.fName.toLowerCase().includes(searchWord) || guest.lName.toLowerCase().includes(searchWord)
    )});
  }

  function getGuests() {
    request.get("/guests")
      .then(res => {
        // if authentication failed redirect to login page
        if (res.message.code === 401) {
          history.push("/sign");
        }
        else if (res.message.code === 200) {
          setGuests({list: res.guestList});
          setFullGuestList(res.guestList);
        }
      })
      .catch(err => err);
  }

  useEffect(getGuests, []);

  return (
    <div>
      <NavigationBar />
      <div className="guest-list-container">
        <div className="filter-container">
          <Typography variant="h1" color="primary" className="filter-container__text">Search</Typography>
          <TextField name="name"
                   label="Name"
                   variant="outlined"
                   onChange={filterGuests}
                   value={filterWord}
          />
        </div>
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
