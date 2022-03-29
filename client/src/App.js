import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    // Makes call to get all users endpoint
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Saves the first user to state
        setApiData(data[0]);
      });
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello {apiData.first_name} {apiData.last_name}, from{" "}
          {apiData.location}!
        </p>
        <p>
          Your account was created at {formatDate(apiData.createdAt)} and last
          updated on {formatDate(apiData.updatedAt)}
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
