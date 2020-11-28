import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Guests from "./components/pages/guests/Guests";
import Gifts from "./components/pages/gifts/Gifts";
import Menu from "./components/pages/menu/Menu";
import Music from "./components/pages/music/Music";
import Sign from "./components/pages/sign/Sign";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import theme from "./utility/theme";
import './App.scss';

function App() {

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
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
            <Route path="/sign">
              <Sign />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
