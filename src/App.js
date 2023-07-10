import React from "react";
import { useEffect, useState } from "react";

import "semantic-ui-css/semantic.min.css";
import Weather from "./components/weather";
import "./App.css";

const App = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(
        `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("API request failed");
          }
          return res.json();
        })
        .then((result) => {
          console.log(result);
          setData(result);
        })
        .catch((error) => {
          console.error(error);
          // Handle the error here, e.g., set an error state or display an error message
        });
    };

    fetchData();
  }, [lat, long]);

  return (
    <div className="App">
      {typeof data.main != "undefined" ? (
        <Weather weatherData={data} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default App;
