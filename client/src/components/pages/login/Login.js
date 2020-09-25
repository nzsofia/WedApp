import React, {useState} from "react";
import './Login.css';
import Input from "../../shared/input/input.js";
import Button from "../../shared/button/button.js";
import {Redirect} from "react-router-dom";

function Login() {
  const [user,setUser] = useState({
    email: "",
    password: ""
  });

  const [returnMessage,setReturnMessage] = useState({
    code: null,
    content: ""
  });

  function handleChange(event){
    const {name, value} = event.target;

    setUser(prevUser => {
      return {
        ...prevUser,
        [name]: value
      };
    });
  }

  function callAPIpost() {
    const requestOptions = {
      method: "POST",
      header: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    };
    fetch("http://localhost:9000/login",requestOptions)
      .then(res => res.json())
      .then(res => setReturnMessage(res.message))
      .catch(err => err);
  }

  function performLogin(event){
    //check in database if email-password pair is correct
    callAPIpost();
    //if not, notify user, that password or email in incorrect --> automatic
    //if everything is correct redirect to home page
    if (returnMessage.code === 200){
      return  <Redirect  to="/" />;
    }
    else{
      event.preventDefault();
    }
  }

  return (
    <div>
      <h1>
        LogIn
      </h1>
      {returnMessage.content !== "" && <p>{returnMessage.content}</p>}
      <form>
        <Input
          onChange={handleChange}
          value={user.email}
          name="email"
          placeholder="Email"
          type="email"
        />
        <Input
          onChange={handleChange}
          value={user.password}
          name="password"
          placeholder="Password"
          type="password"
        />
        <Button
          name="Submit"
          onClick={performLogin}
        />
      </form>
    </div>
  );
}

export default Login;
