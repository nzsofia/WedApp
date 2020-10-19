import React, {useState, useEffect} from "react";
import './Guests.css';
import { useHistory } from "react-router-dom";

function Guests() {

  const history = useHistory();
  const [guests, setGuests]=useState({list: []});

  function getGuests(){
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
        //if authentication failed redirect to login page
        if (res.message.code === 401){
          history.push("/login");
        }
        else if (res.message.code === 200){
          setGuests({list: res.guestList})
        }
      })
      .catch(err => err);
  }

  useEffect(getGuests, []);

  return (
    <div>
      <ul>
        {guests.list.map(guest => <li key={guest._id}>{guest.fName} {guest.lName}</li>)}
      </ul>
    </div>
  );
}

export default Guests;
