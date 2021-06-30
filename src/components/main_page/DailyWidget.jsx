import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Paper,
  Typography,
  useTheme,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Redirect, useRouteMatch } from "react-router-dom";
import { SettingsContext } from "../../App";
import { CloudRain as Water } from "@styled-icons/boxicons-regular/CloudRain";

const useStyles = makeStyles((theme) => ({
  medium: {
    fontSize: theme.typography.pxToRem(18),
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.pxToRem(15),
    },
  },
  small: {
    fontSize: theme.typography.pxToRem(15),
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.pxToRem(12),
    },
  },
}));

function calculateCardAmount(
  firstCard,
  firstCardOuter,
  amountToRender,
  setAmountToRender
) {
  if (
    parseFloat(window.getComputedStyle(firstCardOuter.current).width) -
      parseFloat(window.getComputedStyle(firstCard.current).width) <
    10
  ) {
    setAmountToRender((prev) => (prev === 1 ? prev : prev - 1));
  } else if (amountToRender.current === 1) {
    if (
      parseFloat(window.getComputedStyle(firstCardOuter.current).width) -
        parseFloat(window.getComputedStyle(firstCard.current).width) >
      150
    ) {
      setAmountToRender((prev) => prev + 1);
    }
  } else if (amountToRender.current === 2) {
    if (
      parseFloat(window.getComputedStyle(firstCardOuter.current).width) -
        parseFloat(window.getComputedStyle(firstCard.current).width) >
      100
    ) {
      setAmountToRender((prev) => prev + 1);
    }
  } else if (
    parseFloat(window.getComputedStyle(firstCardOuter.current).width) -
      parseFloat(window.getComputedStyle(firstCard.current).width) >
    65
  ) {
    setAmountToRender((prev) => prev + 1);
  }
}

function DailyWidget({ stationData }) {
  const classes = useStyles();
  const [amountToRender, setAmountToRender] = useState(1);
  const amountToRenderPersist = useRef(amountToRender);
  amountToRenderPersist.current = amountToRender;

  const theme = useTheme();

  const firstCard = useRef();
  const firstCardOuter = useRef();

  useEffect(() => {
    calculateCardAmount(
      firstCard,
      firstCardOuter,
      amountToRenderPersist,
      setAmountToRender
    );
  }, [amountToRender]);

  useEffect(() => {
    function eventListenerFunction() {
      calculateCardAmount(
        firstCard,
        firstCardOuter,
        amountToRenderPersist,
        setAmountToRender
      );
    }
    window.addEventListener("resize", eventListenerFunction);
    return () => window.removeEventListener("resize", eventListenerFunction);
  }, []);

  const { path } = useRouteMatch();
  const [redirect, setRedirect] = useState(null);

  const [settings] = useContext(SettingsContext);

  return (
    <>
      {redirect}
      <Card elevation={4} style={{ marginTop: theme.spacing(4) }}>
        <CardHeader title="Daily Forecast"></CardHeader>
        <CardContent
          elevation={4}
          style={{
            display: "flex",
          }}
        >
          {stationData.daily
            .slice(1, amountToRender + 1)
            .map((entry, index) => {
              const date = new Date(
                (entry.dt + stationData.timezone_offset) * 1000
              );

              const day = date.toLocaleString("en-GB", {
                weekday: "short",
                day: "2-digit",
              });

              return (
                <div
                  key={index}
                  ref={index === 0 ? firstCardOuter : null}
                  style={{
                    flexGrow: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Paper
                    ref={index === 0 ? firstCard : null}
                    variant="outlined"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      width: 130,
                      padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h6" component="p">
                      {day}
                    </Typography>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="h5"
                        component="p"
                        style={{ margin: `${theme.spacing(1)}px 0px` }}
                      >
                        {settings.temperature === "c"
                          ? Math.round(entry.temp.day - 273.15) + "°C"
                          : settings.temperature === "k"
                          ? Math.round(entry.temp.day) + "K"
                          : Math.round((entry.temp.day * 9) / 5 - 459.67) +
                            "°F"}
                      </Typography>
                      <Typography className={classes.medium}>
                        {"\u00A0/\u00A0"}
                      </Typography>
                      <Typography className={classes.small}>
                        {settings.temperature === "c"
                          ? Math.round(entry.temp.night - 273.15) + "°C"
                          : settings.temperature === "k"
                          ? Math.round(entry.temp.night) + "K"
                          : Math.round((entry.temp.night * 9) / 5 - 459.67) +
                            "°F"}
                      </Typography>
                    </div>
                    <img
                      style={{
                        margin: `${theme.spacing(1)}px 0px`,
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
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Water width={20} />
                      <Typography variant="h6" component="p">
                        {"\u00A0"}
                        {Math.round(entry.pop * 100)}%
                      </Typography>
                    </div>
                  </Paper>
                </div>
              );
            })}
        </CardContent>
        <CardActions>
          <Button
            onClick={() => setRedirect(<Redirect push to={`${path}/daily`} />)}
            color="primary"
          >
            Next 7 Days
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default DailyWidget;
