import React, { useState, useEffect } from "react";
import homePage from "../../../assets/svg/compositions/home_page.svg";
import './Home.scss';
import { useHistory } from "react-router-dom";
import Input from "../../shared/input/input.js";
import Button from "../../shared/button/button.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import NavigationBar from "../../shared/navigation-bar/NavigationBar";


function Home() {
  const history = useHistory();
  const rsvpValues = ["-- Please choose an option! --", "Yes, I'm coming to the wedding! :)", "No, I cannot come to the wedding! :("];
  const namesText = "ZSÓFI & LEVI";

  // State variables
  const [response, setResponse] = useState({
      allergies: ""
  });
  const [rsvp, setRsvp]=useState(rsvpValues[0]);
  const [plusPeople, setPlusPeople] = useState([{key: 0, fNamePP: "", lNamePP: ""}]);
  const [maxInput, setMaxInput] = useState(1);
  const [hasResponded, setHasResponded] = useState(false);

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
        // if authentication failed redirect to login page
        if (res.message.code === 401) {
          history.push("/login");
        }
        else if (res.message.code === 200) {
          // set the number of plus people allowed as the maximum for the number of input fields that can be added
          if (res.plusPeopleNumber)
            setMaxInput(res.plusPeopleNumber);
          // do not show response form, if user already responded
          if (res.rsvp!=null)
            setHasResponded(true);
        }
      })
      .catch(err => err);
  }

  function handleSelect(evKey) {
    setRsvp(evKey);
  }

  function handleChange(event) {
    const {name, value} = event.target;

    setResponse(prevResponse => {
      return {
        ...prevResponse,
        [name]: value
      };
    });
  }

  function handleChangePlusPeople(event, index) {
    const {name, value} = event.target;
    const tempList = [...plusPeople];
    tempList[index][name] = value;
    setPlusPeople(tempList);
  }

  function addPlusPerson() {
    setPlusPeople([...plusPeople, {key: plusPeople.length, fNamePP: "", lNamePP: ""}]);
  }

  function sendResponse(event) {
    const responseData = {
      rsvp: rsvpValues.findIndex(v => v === rsvp),
      allergies: response.allergies,
      plusPeople: plusPeople
    }

    const requestOptions = {
      method: "POST",
      withCredentials: true,
      credentials: 'include',
      headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(responseData)
    };

    fetch("http://localhost:9000/", requestOptions)
      .then(res => res.json())
      .then(res => {
        // if response was saved, notify user
        if (res.message.code === 200) {
          setHasResponded(true);
        }
        else {
          // TODO: pop-up notification or something
        }
        event.preventDefault();
      })
      .catch(err => err);
  }

  // check if user is authorized to access this page
  useEffect(authenticate, []);

  return (
    <div>
      <NavigationBar />
      <header className="header-img">
        <img src={homePage} alt="Home design"/>
        <div className="names">{namesText}</div>
        <div className="date date--1">2021</div>
        <div className="date date--2">SZEPT</div>
        <div className="date date--3">18</div>
      </header>
      {hasResponded ? <div><h1>Thank you for your response!</h1></div> :
      <div>
        <h1>RSVP</h1>
        <p>Please RSVP here as soon as possible!</p>
        <form>
          <DropdownButton
            alignRight
            title={rsvp}
            id="dropdown-menu-align-right"
            onSelect={handleSelect}
          >
            <Dropdown.Item eventKey={rsvpValues[1]}>{rsvpValues[1]}</Dropdown.Item>
            <Dropdown.Item eventKey={rsvpValues[2]}>{rsvpValues[2]}</Dropdown.Item>
          </DropdownButton>
          {plusPeople.map((plusPerson, i) => {
            return(
              <div>
                <Input
                  onChange={e => handleChangePlusPeople(e,i)}
                  value={plusPerson.fNamePP}
                  name="fNamePP"
                  placeholder="First Name"
                />
                <Input
                  onChange={e => handleChangePlusPeople(e,i)}
                  value={plusPerson.lNamePP}
                  name="lNamePP"
                  placeholder="Last Name"
                />
              </div>
            );
          })}
          { plusPeople.length < maxInput && //maybe it can be deactivated (appear grey) not removed
            <Button
            name="+"
            type="button"
            onClick={addPlusPerson}
          />}
          <Input
            onChange={handleChange}
            value={response.allergies}
            name="allergies"
            placeholder="Allergies"
          />
          <Button
            name="Submit"
            type="button"
            onClick={sendResponse}
          />
        </form>
      </div>}
    </div>
  );
}

export default Home;
