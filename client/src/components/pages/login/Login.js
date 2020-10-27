import React, { useState, useEffect } from "react";
import './Login.scss';
import Input from "../../shared/input/input.js";
import Button from "../../shared/button/button.js";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();

  const [user,setUser] = useState({
    username: "",
    password: ""
  });

  const [returnMessage,setReturnMessage] = useState({
    code: null,
    content: ""
  });

  function handleChange(event) {
    const {name, value} = event.target;

    setUser(prevUser => {
      return {
        ...prevUser,
        [name]: value
      };
    });
  }

  function performLogin(event) {
    // check in database if email-password pair is correct
    const requestOptions = {
      method: "POST",
      withCredentials: true,
      credentials: 'include',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    fetch("http://localhost:9000/login", requestOptions)
      .then(res => res.json())
      .then(res => {
        setReturnMessage(res.message);

        // if not, notify user, that password or email in incorrect --> automatic
        // if everything is correct redirect to home page
        if (res.message.code === 200) {
          history.push("/");
        }
        else {
          event.preventDefault();
        }
      })
      .catch(err => err);
  }

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
        // if alredy logged in, load home page
        if (res.message.code === 200) {
          history.push("/");
        }
      })
      .catch(err => err);
  }

  // check if user is authorized to access this page
  useEffect(authenticate, []);

  return (
    <div>
      <h1>
        LogIn
      </h1>
      {returnMessage.content !== "" && <p>{returnMessage.content}</p>}
      <form>
        <Input
          onChange={handleChange}
          value={user.username}
          name="username"
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
          type="button"
          onClick={performLogin}
        />
      </form>
    </div>
  );
}

export default Login;
