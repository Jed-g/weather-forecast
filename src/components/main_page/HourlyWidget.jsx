import React from "react";
import { Paper } from "@material-ui/core";

function HourlyWidget({ stationData }) {
  return <Paper elevation={4} style={{display: "flex"}}>
{stationData.hourly.slice(1).map(entry => {
    return <Paper variant="outlined">
        
    </Paper>
})}
  </Paper>;
}

export default HourlyWidget;
