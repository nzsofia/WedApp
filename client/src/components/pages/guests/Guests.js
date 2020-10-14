import React, {useState, useEffect} from "react";
import './Guests.css';

function Guests() {
  const [state, setState] = useState({ apiResponse: "" });
  const [guests, setGuests]=useState({list: []});

  function callAPIget() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setState({ apiResponse: res }))
      .catch(err => err);
  }

  function testGuest(){
    fetch("http://localhost:9000/guests")
      .then(res => res.json())
      .then(res => setGuests({list: res.guestList}))
      .catch(err => err);
  }

  useEffect(testGuest, []);

  return (
    <div>
      <ul>
        {guests.list.map(guest => <li key={guest._id}>{guest.name}</li>)}
      </ul>
    </div>
  );
}

export default Guests;
