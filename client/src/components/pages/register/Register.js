import React, {useState} from "react";
import './Register.css';
import Input from "../../shared/input/input.js";
import Button from "../../shared/button/button.js";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();

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

  function handleChange(event){
    const {name, value} = event.target;

    setUser(prevUser => {
      return {
        ...prevUser,
        [name]: value
      };
    });
  }

  function performRegistration(event) {

    //check in database if user already exist
    const requestOptions = {
      method: "POST",
      headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    fetch("http://localhost:9000/register",requestOptions)
      .then(res => res.json())
      .then(res => {
        setReturnMessage(res.message);

        //if it exists, notify user
        //if everything is correct redirect to login page
        if (res.message.code === 200){
          history.push("/login");
        }
        else{
          event.preventDefault();
        }
      })
      .catch(err => err);
  }


  return (
    <div>
    <h1>
      Register
    </h1>
    {returnMessage.code !== 200 && <p>{returnMessage.content}</p>}
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
        onClick={performRegistration}
        type="button"
      />
    </form>
    </div>
  );
}

export default Register;
