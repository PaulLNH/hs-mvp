import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiData(data);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello {apiData.firstName} {apiData.lastName}, from {apiData.location}!
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
    </div>
  );
}

export default App;
