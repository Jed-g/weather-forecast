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
  header: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.primary,
  },
  summaryContent: {
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function Hourly({ stationData, setTabSelected }) {
  useEffect(() => {
    setTabSelected(1);
  }, []);

  const [settings] = useContext(SettingsContext);

  const theme = useTheme();
  const breakpointMatches = useMediaQuery(theme.breakpoints.down("xs"));

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let prevDay;

  return (
    <>
      <CurrentWeatherWidget stationData={stationData} />
      <Paper
        elevation={4}
        style={{ marginTop: theme.spacing(4), padding: theme.spacing(2) }}
        className={classes.root}
      >
        {stationData.hourly.map((entry, index) => {
          const date = new Date(
            (entry.dt + stationData.timezone_offset) * 1000
          );
          const time = date.toLocaleString("en-GB", {
            hour: "numeric",
            minute: "numeric",
          });

          const day = date.toLocaleString("en-GB", {
            weekday: "long",
          });

          let dayChange = !(prevDay === day);
          prevDay = day;

          const fullDate = date.toLocaleString("en-GB", {
            weekday: "long",
            day: "2-digit",
            month: "long",
          });

          return (
            <>
              {dayChange && (
                <Typography
                  key={day}
                  style={{ margin: theme.spacing(2) }}
                  component="p"
                  variant="h6"
                >
                  {fullDate}
                </Typography>
              )}
              <Accordion
                TransitionProps={{ unmountOnExit: true }}
                elevation={0}
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
              >
                <AccordionSummary
                  classes={{ content: classes.summaryContent }}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <Typography
                      style={{ marginRight: breakpointMatches ? "8vw" : 75 }}
                      className={classes.header}
                    >
                      {time}
                    </Typography>
                    <Typography className={classes.header}>
                      {settings.temperature === "c"
                        ? Math.round((entry.temp - 273.15) * 10) / 10 + "°C"
                        : settings.temperature === "k"
                        ? Math.round(entry.temp * 10) / 10 + "K"
                        : Math.round(((entry.temp * 9) / 5 - 459.67) * 10) /
                            10 +
                          "°F"}
                    </Typography>
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
                        <DetailBox
                          parameterName="Feels Like"
                          parameterValue={
                            settings.temperature === "c"
                              ? Math.round((entry.temp - 273.15) * 10) / 10 +
                                "°C"
                              : settings.temperature === "k"
                              ? Math.round(entry.temp * 10) / 10 + "K"
                              : Math.round(
                                  ((entry.temp * 9) / 5 - 459.67) * 10
                                ) /
                                  10 +
                                "°F"
                          }
                        />
                        <DetailBox
                          parameterName="Precipitation"
                          parameterValue={entry.pop * 100 + "%"}
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
                              ? Math.round(
                                  (entry.pressure * 1000) / 1013.2501
                                ) /
                                  1000 +
                                " atm"
                              : Math.round((entry.pressure * 100) / 33.86) /
                                  100 +
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
                          parameterName="Visibility"
                          parameterValue={
                            entry.visibility >= 10000
                              ? settings.distance === "m"
                                ? ">" + entry.visibility + "m"
                                : settings.distance === "km"
                                ? ">" +
                                  Math.round((entry.visibility * 10) / 1000) /
                                    10 +
                                  "km"
                                : ">" +
                                  Math.round((entry.visibility * 10) / 1609) /
                                    10 +
                                  "mi"
                              : settings.distance === "m"
                              ? entry.visibility + "m"
                              : settings.distance === "km"
                              ? Math.round((entry.visibility * 10) / 1000) /
                                  10 +
                                "km"
                              : Math.round((entry.visibility * 10) / 1609) /
                                  10 +
                                "mi"
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
            </>
          );
        })}
      </Paper>
    </>
  );
}

export default Hourly;
