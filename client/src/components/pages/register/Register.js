import React, {useState} from "react";
import './Register.css';
import Input from "../../shared/input/input.js";
import Button from "../../shared/button/button.js";
import {Redirect} from "react-router-dom";

function Register() {
  const [user,setUser] = useState({
    fName: "",
    lName: "",
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
    console.log(user);
    const requestOptions = {
      encoding: "utf8",
      method: "POST",
      headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };
    fetch("http://localhost:9000/register",requestOptions)
      .then(res => res.json())
      .then(res => setReturnMessage(res.message))
      .catch(err => err);
  }

  function performRegistration(event){
    //check in database if user already exist
    callAPIpost();
    //if it exists, notify user
    //if everything is correct redirect to login page
    if (returnMessage.code === 200){
      return  <Redirect  to="/login" />;
    }
    else{
      event.preventDefault();
    }
  }

  return (
    <div>
    <h1>
      Register
    </h1>
    {returnMessage.content !== "" && <p>{returnMessage.content}</p>}
    <form>
      <Input
        onChange={handleChange}
        value={user.fName}
        name="fName"
        placeholder="First Name"
      />
      <Input
        onChange={handleChange}
        value={user.lName}
        name="lName"
        placeholder="Last Name"
      />
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
        onClick={performRegistration}
      />
    </form>
    </div>
  );
}

export default Register;
