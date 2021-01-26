import React, { useState, useEffect, useContext } from "react";
import { ApiKeyContext } from "../../App";

function MainPage({ match }) {
  const [cityData, setCityData] = useState(null);

  const API_KEY = useContext(ApiKeyContext);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${match.params.id}&appid=${API_KEY}`
    )
      .then((response) => response.text())
      .then((data) => setCityData(data))
      .catch((err) => console.err(err));
  }, []);

  return (
    <p style={{ wordBreak: "break-all", textAlign: "center" }}>{cityData}</p>
  );
}

export default MainPage;
