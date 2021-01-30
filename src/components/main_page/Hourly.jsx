import React, { useEffect } from "react";

function Hourly({ stationData, setTabSelected }) {
  useEffect(() => {
    setTabSelected(1);
  }, []);

  return <div>Hourly</div>;
}

export default Hourly;
