import React, { useEffect } from "react";
import CurrentWeatherWidget from "./CurrentWeatherWidget";
import HourlyWidget from "./HourlyWidget";
import DailyWidget from "./DailyWidget";
import AdditionalInfoWidget from "./AdditionalInfoWidget";

function Current({ stationData, setTabSelected }) {
  useEffect(() => {
    setTabSelected(0);
  }, []);

  return (
    <>
      <CurrentWeatherWidget stationData={stationData} />
      <AdditionalInfoWidget stationData={stationData} />
      <HourlyWidget stationData={stationData} />
      <DailyWidget stationData={stationData} />
    </>
  );
}

export default Current;
