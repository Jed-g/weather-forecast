import React, { useContext } from "react";
import { Paper, useTheme, Typography } from "@material-ui/core";
import SunriseSunset from "./SunriseSunset";
import DetailList from "./DetailList";
import { SettingsContext } from "../../App";

function AdditionalInfoWidget({ stationData }) {
  const [settings] = useContext(SettingsContext);
  const theme = useTheme();
  return (
    <Paper
      elevation={4}
      style={{
        marginTop: theme.spacing(4),
        paddingBottom: theme.spacing(1),
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: theme.spacing(2),
          padding: theme.spacing(2),
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginRight: 20,
          }}
        >
          <Typography variant="h6" component="p">
            Weather Today in {stationData.city}, {stationData.country}
          </Typography>
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
          >
            <Typography variant="h3" component="p">
              {settings.temperature === "c"
                ? Math.round((stationData.current.feels_like - 273.15) * 10) /
                    10 +
                  "°C"
                : settings.temperature === "k"
                ? Math.round(stationData.current.feels_like * 10) / 10 + "K"
                : Math.round(
                    ((stationData.current.feels_like * 9) / 5 - 459.67) * 10
                  ) /
                    10 +
                  "°F"}
            </Typography>
            <Typography color="textSecondary" variant="h6" component="p">
              Feels Like
            </Typography>
          </div>
        </div>
        <SunriseSunset
          sunriseInUnix={stationData.current.sunrise}
          sunsetInUnix={stationData.current.sunset}
          timezone_offset={stationData.timezone_offset}
          currentTime={stationData.current.dt}
        />
      </div>
      <DetailList stationData={stationData} />
    </Paper>
  );
}

export default AdditionalInfoWidget;
