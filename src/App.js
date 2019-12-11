import React, { useEffect, useState } from "react";
import { Alert, Divider, Flex, Image, Text } from "@fluentui/react";

import logo from "./logo.svg";
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
        const d = { ...serverData, dt_fetch: new Date() };
        localStorage["data"] = JSON.stringify(d);
        setData({ ...d, loading: false, error: null });
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
              <Flex column gap="gap.small">
                <Flex hAlign="center">
                  <Image src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}></Image>
                </Flex>
                <Text>Temp: {data.main.temp}</Text>
                <Text>High: {data.main.temp_max}</Text>
                <Text>Low: {data.main.temp_min}</Text>
                <Text>Conditions: {data.weather[0].main}</Text>
                <Text>Location: {data.name}</Text>
                <Text>Updated: {new Date(data.dt_fetch).toString()}</Text>
              </Flex>
            )}
          </div>
          <div>
            {data.error && (
              <Flex column gap="gap.small">
                <Divider />
                <Flex hAlign="center">
                  <Alert>Error: {data.error.toString()}</Alert>
                </Flex>
              </Flex>
            )}
          </div>
          <div>
            {data.loading && (
              <Flex column gap="gap.small">
                <Divider />
                <Flex hAlign="center">
                  <Alert>Loading...</Alert>
                </Flex>
              </Flex>
            )}
          </div>
        </div>
      ) : (
        <Flex column gap="gap.small">
          <Divider />
          <Flex hAlign="center">
            <Alert>Loading...</Alert>
          </Flex>
        </Flex>
      )}
    </div>
  );
}

export default App;
