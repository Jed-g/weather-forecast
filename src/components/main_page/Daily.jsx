import React, { useEffect } from "react";

function Daily({ stationData, setTabSelected }) {
  useEffect(() => {
    setTabSelected(2);
  }, []);

  return <div>Daily</div>;
}

export default Daily;
