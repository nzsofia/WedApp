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

  function callAPIpost() {
    const requestOptions = {
      method: "POST",
      header: {"Content-Type": "application/json"},
      body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    };
    fetch("http://localhost:9000/testAPI",requestOptions)
      .then(res => res.text())
      .then(res => setState({ apiResponse: res }))
      .catch(err => err);
  }

  function testGuest(){
    fetch("http://localhost:9000/guests")
      .then(res => res.json())
      .then(res => setGuests({list: res.guestList}))
  }

  useEffect(testGuest, []);

  return (
    <div>
    <h2>Guests works!</h2>
    {guests.list.map(guest => <p key={guest._id}>{guest.name}</p>)}
    </div>
  );
}

export default Guests;
