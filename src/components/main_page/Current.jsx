import React, { useEffect } from "react";
import CurrentWeatherWidget from "./CurrentWeatherWidget";
import HourlyWidget from "./HourlyWidget";

function Current({ stationData, setTabSelected }) {
  useEffect(() => {
    setTabSelected(0);
  }, []);

  return (
    <>
      <CurrentWeatherWidget stationData={stationData} />
      <HourlyWidget stationData={stationData} />
    </>
  );
}

export default Current;
