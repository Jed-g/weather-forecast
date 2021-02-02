import React, { useEffect } from "react";
import CurrentWeatherWidget from "./CurrentWeatherWidget";

function Daily({ stationData, setTabSelected }) {
  useEffect(() => {
    setTabSelected(2);
  }, []);

  return (
    <>
      <CurrentWeatherWidget stationData={stationData} />
    </>
  );
}

export default Daily;
