import React, {useEffect} from "react";
import logo from "../../../logo.svg";
import './Home.css';
import { useHistory } from "react-router-dom";

function Home() {

  const history = useHistory();

  function authenticate(){
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
        //if authentication failed redirect to login page
        if (res.message.code === 401){
          history.push("/login");
        }
      })
      .catch(err => err);
  }

  //check if user is authorized to access this page
  useEffect(authenticate, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default Home;
