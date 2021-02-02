import React, { useEffect } from "react";
import CurrentWeatherWidget from "./CurrentWeatherWidget";

function Current({ stationData, setTabSelected }) {
  useEffect(() => {
    setTabSelected(0);
  }, []);

  return (
    <>
      <CurrentWeatherWidget stationData={stationData} />
    </>
  );
}

export default Current;
