import React, { useContext } from "react";
import {
  Paper,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { SettingsContext } from "../../App";

const useStyles = makeStyles((theme) => ({
  text: {
    color: theme.palette.text.primary,
  },
  transparentText: {
    color: theme.palette.text.secondary,
  },
}));

function CurrentWeatherWidget({ stationData }) {
  const [settings] = useContext(SettingsContext);
  const classes = useStyles();
  const theme = useTheme();
  const breakpointMatches = useMediaQuery(theme.breakpoints.down("xs"));

  const date = new Date(
    (stationData.current.dt + stationData.timezone_offset) * 1000
  );
  const time = date.toLocaleString("en-GB", {
    hour: "numeric",
    minute: "numeric",
  });

  const utcOffset = stationData.timezone_offset / 3600;

  return (
    <Paper elevation={4} style={{ padding: theme.spacing(2) }}>
      <Typography
        className={classes.text}
        style={{ marginBottom: 5 }}
        component="h1"
        variant="h4"
      >
        {stationData.city}, {stationData.country}
      </Typography>
      <Typography
        className={classes.transparentText}
        component="p"
        variant="caption"
      >
        {stationData.lat} {stationData.lon}
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography className={classes.text} component="p" variant="h3">
            {settings.temperature === "c"
              ? Math.round((stationData.current.temp - 273.15) * 10) / 10 + "°C"
              : settings.temperature === "k"
              ? Math.round(stationData.current.temp * 10) / 10 + "K"
              : Math.round(((stationData.current.temp * 9) / 5 - 459.67) * 10) /
                  10 +
                "°F"}
          </Typography>
          <Typography
            className={classes.text}
            style={{ textTransform: "capitalize" }}
          >
            {stationData.current.weather[0].description}
          </Typography>
        </div>
        <img
          style={{
            height: breakpointMatches ? 64 : 72,
            backgroundColor:
              theme.palette.type === "dark" ? "#5072A7" : "#7CB9E8",
            borderRadius: 20,
          }}
          alt="icon"
          src={`https://openweathermap.org/img/wn/${stationData.current.weather[0].icon}@2x.png`}
        />
      </div>
      <Typography
        className={classes.transparentText}
        component="p"
        variant="caption"
      >
        As of {time} UTC {utcOffset > 0 ? `+${utcOffset}` : utcOffset}
      </Typography>
    </Paper>
  );
}

export default CurrentWeatherWidget;
