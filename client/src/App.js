import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Guests from "./components/pages/guests/Guests";
import Gifts from "./components/pages/gifts/Gifts";
import Menu from "./components/pages/menu/Menu";
import Music from "./components/pages/music/Music";
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import './App.scss';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/guests">
          <Guests />
        </Route>
        <Route path="/gifts">
          <Gifts />
        </Route>
        <Route path="/menu">
          <Menu />
        </Route>
        <Route path="/music">
          <Music />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
