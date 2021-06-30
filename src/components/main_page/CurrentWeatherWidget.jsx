import React, { useContext } from "react";
import { Paper, Typography, useTheme, useMediaQuery } from "@material-ui/core";
import { SettingsContext } from "../../App";

function CurrentWeatherWidget({ stationData }) {
  const [settings] = useContext(SettingsContext);
  const theme = useTheme();
  const breakpointMatches = useMediaQuery(theme.breakpoints.down("xs"));

  const date = new Date(
    (stationData.current.dt + stationData.timezone_offset) * 1000
  );
  const time = date.toLocaleString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  });

  const utcOffset = stationData.timezone_offset / 3600;

  return (
    <Paper elevation={4} style={{ padding: theme.spacing(2) }}>
      <Typography
        color="textPrimary"
        style={{ marginBottom: 5 }}
        component="h1"
        variant="h4"
      >
        {stationData.city}, {stationData.country}
      </Typography>
      <Typography color="textSecondary" component="p" variant="caption">
        {stationData.lat}, {stationData.lon}
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <div>
          <Typography color="textPrimary" component="p" variant="h2">
            {settings.temperature === "c"
              ? Math.round(stationData.current.temp - 273.15) + "°C"
              : settings.temperature === "k"
              ? Math.round(stationData.current.temp) + "K"
              : Math.round((stationData.current.temp * 9) / 5 - 459.67) + "°F"}
          </Typography>
          <Typography
            color="textPrimary"
            style={{ textTransform: "capitalize" }}
            variant="h5"
            component="p"
          >
            {stationData.current.weather[0].description}
          </Typography>
        </div>
        <img
          style={{
            height: breakpointMatches ? 72 : 100,
            backgroundColor:
              theme.palette.type === "dark" ? "#5072A7" : "#7CB9E8",
            borderRadius: 20,
          }}
          alt="icon"
          src={`https://openweathermap.org/img/wn/${stationData.current.weather[0].icon}@2x.png`}
        />
      </div>
      <Typography color="textSecondary" component="p" variant="caption">
        As of {time} UTC {utcOffset > 0 ? `+${utcOffset}` : utcOffset}
      </Typography>
    </Paper>
  );
}

export default CurrentWeatherWidget;
