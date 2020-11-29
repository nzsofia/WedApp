import React, { useState } from "react";
import './Login.scss';
import ErrorMessage from "../../../shared/error-message/ErrorMessage.js"
import { Container, Avatar, Button, CssBaseline, TextField } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from "react-router-dom";
import * as EmailValidator from "email-validator";
import * as request from "../../../../services/request";

function Login(props) {
  const history = useHistory();
  const { value, index, ...other } = props;

  const [user,setUser] = useState({
    username: "",
    password: ""
  });

  const [formError, setFormError] = useState({
    username: null,
    password: null
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

  function validation() {

    let newError = {};

    if(!user.username) {
      newError.username = "Required";
    }
    else if (!EmailValidator.validate(user.username)) {
      newError.username = "Invalid email address";
    }

    if(!user.password) {
      newError.password = "Required";
    }
    else if (user.password.length < 3) {
      newError.password = "Password must be at least 3 characters long";
    }

    setFormError(newError);
    //check if there were any errors
    if(Object.keys(newError).length === 0) return true;
    return false;
  }

  function performLogin(event) {

    //validate form fields
    if(!validation()) {
      event.preventDefault();
      return;
    }

    // check in database if email-password pair is correct
    request.post(`${request.URL}/login`, user)
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
          {returnMessage.code && returnMessage.code !== 200 &&
            <ErrorMessage>{returnMessage.content}</ErrorMessage>}
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
              error={formError.username}
              helperText={formError.username}
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
              error={formError.password}
              helperText={formError.password}
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
