import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import "./App.css";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    try {
      if (localStorage["data"]) {
        setData(JSON.parse(localStorage["data"]));
      }
    } catch (err) {
      localStorage.removeItem("data");
    }

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Seattle,US&units=imperial&APPID=d0cb21f45c215358b09cc3c09b5ef147"
    )
      .then(res => res.json())
      .then(serverData => {
        localStorage["data"] = JSON.stringify(serverData);
        setData(d => ({ ...d, loading: false, error: null }));
      })
      .catch(err => {
        setData(d => ({ ...d, loading: false, error: err }));
      });
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
              <div>
                <br/>
                <div>Error: {data.error.toString()}</div>
              </div>
            )}
          </div>
          <div>
            {data.loading && (
              <div>
                <br/>
                <div>Refreshing...</div>
              </div>
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
