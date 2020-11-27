import React, { useState } from "react";
import './Login.scss';
import {Container, Avatar, Button, CssBaseline, TextField  } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from "react-router-dom";

function Login(props) {
  const history = useHistory();
  const { value, index, ...other } = props;

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

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id="login-tab"
      aria-labelledby="login"
      {...other}
    >
      {value === index && (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="login-container">
          <Avatar className="login-avatar">
            <LockOutlinedIcon />
          </Avatar>
          <form className="login-form" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="username"
              type="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              value={user.username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={user.password}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              className="login-button"
              onClick={performLogin}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
      )}
    </div>
  );
}

export default Login;
