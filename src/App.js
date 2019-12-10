import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import "./App.css";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    if (localStorage["data"]) {
      setData(localStorage["data"]);
    };

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Seattle,US&units=imperial&APPID=d0cb21f45c215358b09cc3c09b5ef147"
    )
      .then(res => res.json())
      .then(data => {
        localStorage["data"] = data;
        setData(data);
      })
      .catch(err => setData({ error: err }));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {data ? (
        <div>
          <div>
            {data.main && data.main.temp && (
              <div>
                <div>Temp: {data.main.temp}</div>
                <div>High: {data.main.temp_max}</div>
                <div>Low: {data.main.temp_min}</div>
                <div>Conditions: {data.weather[0].main}</div>
                <div>Location: {data.name}</div>
                <div>Updated: {new Date(data.dt).toString()}</div>
              </div>
            )}
          </div>
          <div>
            {data.error && (
              <div>Error: {data.error.toString()}</div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
