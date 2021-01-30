import React, { useEffect } from "react";

function Current({ stationData, setTabSelected }) {
  useEffect(() => {
    setTabSelected(0);
  }, []);

  return <div>Current</div>;
}

export default Current;
