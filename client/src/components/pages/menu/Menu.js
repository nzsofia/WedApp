import React, {useEffect} from "react";
import './Menu.css';
import { useHistory } from "react-router-dom";

function Menu() {

  const history = useHistory();

  function authenticate(){
    fetch("http://localhost:9000/menu", {
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
    <div>Menu works!</div>
  );
}

export default Menu;
