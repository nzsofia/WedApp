import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [state,setState]=useState({apiResponse: ""});

  function callAPIget() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setState({ apiResponse: res }))
      .catch(err => err);
  }

  function callAPIpost() {
    const requestOptions = {
      method: "POST",
      header: {"Content-Type": "application/json"},
      body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    };
    fetch("http://localhost:9000/testAPI",requestOptions)
      .then(res => res.text())
      .then(res => setState({ apiResponse: res }))
      .catch(err => err);
      
    // fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
    //     .then(response => response.json())
    //     .then(data => setState({ apiResponse: data.id }));
  }

  useEffect(callAPIpost, []);

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p className="App-intro">{state.apiResponse}</p>
      </div>
    );
}

export default App;
