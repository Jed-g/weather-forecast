import React, { useEffect, useState, useContext } from "react";
import CurrentWeatherWidget from "./CurrentWeatherWidget";
import {
  makeStyles,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useTheme,
  Paper,
  useMediaQuery,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DetailBox from "./DetailBox";
import { SettingsContext } from "../../App";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  headerDate: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.text.primary,
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.pxToRem(15),
    },
  },
  headerSmall: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.primary,
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.pxToRem(12),
    },
  },
  headerLarge: {
    fontSize: theme.typography.pxToRem(21),
    fontWeight: "500",
    color: theme.palette.text.primary,
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  headerMedium: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: "500",
    color: theme.palette.text.primary,
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.pxToRem(15),
    },
  },
  summaryContent: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryRoot: {
    [theme.breakpoints.down("xs")]: {
      padding: "0 8px",
    },
  },
  feelsLikeName: {
    color: theme.palette.text.secondary,
  },
  feelsLikeValueDay: {
    color: theme.palette.text.primary,
  },
}));

function Daily({ stationData, setTabSelected }) {
  useEffect(() => {
    setTabSelected(2);
  }, []);

  const [settings] = useContext(SettingsContext);

  const theme = useTheme();
  const breakpointMatches = useMediaQuery(theme.breakpoints.down("xs"));

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <CurrentWeatherWidget stationData={stationData} />
      <Paper
        elevation={4}
        style={{ marginTop: theme.spacing(4), padding: theme.spacing(2) }}
        className={classes.root}
      >
        {stationData.daily.map((entry, index) => {
          const date = new Date(
            (entry.dt + stationData.timezone_offset) * 1000
          );

          const day = date.toLocaleString("en-GB", {
            weekday: breakpointMatches ? "short" : "long",
            day: "2-digit",
          });

          return (
            <Accordion
              TransitionProps={{ unmountOnExit: true }}
              elevation={0}
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <AccordionSummary
                classes={{
                  content: classes.summaryContent,
                  root: classes.summaryRoot,
                }}
                expandIcon={<ExpandMoreIcon />}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: breakpointMatches ? "40vw" : "min(35vw, 275px)",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: breakpointMatches ? 60 : 120,
                      flexShrink: "0",
                    }}
                  >
                    <Typography className={classes.headerDate}>
                      {day}
                    </Typography>
                  </div>
                  <div
                    style={{
                      marginLeft: breakpointMatches ? "4vw" : 25,
                      width: 100,
                      flexShrink: "0",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography className={classes.headerLarge}>
                      {settings.temperature === "c"
                        ? Math.round(entry.temp.day - 273.15) + "°C"
                        : settings.temperature === "k"
                        ? Math.round(entry.temp.day) + "K"
                        : Math.round((entry.temp.day * 9) / 5 - 459.67) + "°F"}
                    </Typography>
                    <Typography className={classes.headerMedium}>
                      {"\u00A0/\u00A0"}
                    </Typography>
                    <Typography className={classes.headerSmall}>
                      {settings.temperature === "c"
                        ? Math.round(entry.temp.night - 273.15) + "°C"
                        : settings.temperature === "k"
                        ? Math.round(entry.temp.night) + "K"
                        : Math.round((entry.temp.night * 9) / 5 - 459.67) +
                          "°F"}
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexBasis: breakpointMatches ? "16.66%" : "40%",
                  }}
                >
                  <img
                    style={{
                      height: 32,
                      width: 50,
                      objectFit: "cover",
                      backgroundColor:
                        theme.palette.type === "dark" ? "#909090" : "#DCDCDC",
                      borderRadius: 8,
                    }}
                    alt="icon"
                    src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
                  />
                  {breakpointMatches || (
                    <Typography
                      style={{ textTransform: "capitalize", marginLeft: 10 }}
                      className={classes.header}
                    >
                      {entry.weather[0].description}
                    </Typography>
                  )}
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Paper
                  variant="outlined"
                  style={{ width: "100%", padding: "5px 20px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexGrow: "1",
                        margin: "5px 0 5px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: 125,
                        }}
                      >
                        <Typography className={classes.feelsLikeName}>
                          Feels Like
                        </Typography>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            className={classes.feelsLikeValueDay}
                            variant="h5"
                            component="p"
                          >
                            {settings.temperature === "c"
                              ? Math.round(entry.feels_like.day - 273.15) + "°C"
                              : settings.temperature === "k"
                              ? Math.round(entry.feels_like.day) + "K"
                              : Math.round(
                                  (entry.feels_like.day * 9) / 5 - 459.67
                                ) + "°F"}
                          </Typography>
                          <Typography className={classes.headerMedium}>
                            {"\u00A0/\u00A0"}
                          </Typography>
                          <Typography className={classes.headerSmall}>
                            {settings.temperature === "c"
                              ? Math.round(entry.feels_like.night - 273.15) +
                                "°C"
                              : settings.temperature === "k"
                              ? Math.round(entry.feels_like.night) + "K"
                              : Math.round(
                                  (entry.feels_like.night * 9) / 5 - 459.67
                                ) + "°F"}
                          </Typography>
                        </div>
                      </div>
                      <DetailBox
                        parameterName="Precipitation"
                        parameterValue={Math.round(entry.pop * 100) + "%"}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexGrow: "1",
                        margin: "5px 0 5px",
                      }}
                    >
                      <DetailBox
                        parameterName="Humidity"
                        parameterValue={entry.humidity + "%"}
                      />
                      <DetailBox
                        parameterName="Pressure"
                        parameterValue={
                          settings.pressure === "hpa"
                            ? entry.pressure + " hPa"
                            : settings.pressure === "atm"
                            ? Math.round((entry.pressure * 1000) / 1013.2501) /
                                1000 +
                              " atm"
                            : Math.round((entry.pressure * 100) / 33.86) / 100 +
                              " inHg"
                        }
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexGrow: "1",
                        margin: "5px 0 5px",
                      }}
                    >
                      <DetailBox
                        parameterName="Dew Point"
                        parameterValue={
                          settings.temperature === "c"
                            ? Math.round(entry.dew_point - 273.15) + "°C"
                            : settings.temperature === "k"
                            ? Math.round(entry.dew_point) + "K"
                            : Math.round((entry.dew_point * 9) / 5 - 459.67) +
                              "°F"
                        }
                      />
                      <DetailBox
                        parameterName="Clouds"
                        parameterValue={entry.clouds + "%"}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexGrow: "1",
                        margin: "5px 0 5px",
                      }}
                    >
                      <DetailBox
                        parameterName="Wind Speed"
                        parameterValue={
                          settings.speed === "ms"
                            ? Math.round(entry.wind_speed * 10) / 10 + "m/s"
                            : settings.speed === "kph"
                            ? Math.round(entry.wind_speed * 3.6 * 10) / 10 +
                              "kph"
                            : Math.round(entry.wind_speed * 2.237 * 10) / 10 +
                              "mph"
                        }
                      />
                      <DetailBox
                        parameterName="Wind Direction"
                        parameterValue={entry.wind_deg + "°"}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  ></div>
                </Paper>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Paper>
    </>
  );
}

export default Daily;
