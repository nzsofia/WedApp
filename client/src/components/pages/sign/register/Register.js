import React, { useState } from "react";
import './Register.scss';
import {Container, Avatar, Button, CssBaseline, TextField } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from "react-router-dom";

function Register(props) {
  const history = useHistory();
  const { value, index, ...other } = props;

  const [user,setUser] = useState({
    fName: "",
    lName: "",
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

  function performRegistration(event) {
    // check in database if user already exist
    const requestOptions = {
      method: "POST",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    fetch("http://localhost:9000/register", requestOptions)
      .then(res => res.json())
      .then(res => {
        setReturnMessage(res.message);

        // if it exists, notify user
        // if everything is correct redirect to login page
        if (res.message.code === 200) {
          history.push("/sign"); // call login
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
      id="register-tab"
      aria-labelledby="register"
      {...other}
    >
      {value === index && (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="register-container">
          <Avatar className="register-avatar">
            <LockOutlinedIcon />
          </Avatar>
          <form className="register-form" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="First Name"
              name="fName"
              autoFocus
              onChange={handleChange}
              value={user.fName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Last Name"
              name="lName"
              onChange={handleChange}
              value={user.lName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="username"
              type="email"
              autoComplete="email"
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
              className="register-button"
              onClick={performRegistration}
            >
              Register
            </Button>
          </form>
        </div>
      </Container>
      )}
    </div>
  );
}

export default Register;
