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
} from "@material-ui/core";
import { Redirect, useRouteMatch } from "react-router-dom";
import { SettingsContext } from "../../App";
import { Water } from "@styled-icons/entypo/Water";

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

function HourlyWidget({ stationData }) {
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
        <CardHeader title="Hourly Forecast"></CardHeader>
        <CardContent
          elevation={4}
          style={{
            display: "flex",
          }}
        >
          {stationData.hourly
            .slice(1, amountToRender + 1)
            .map((entry, index) => {
              const date = new Date(
                (entry.dt + stationData.timezone_offset) * 1000
              );

              const time = date.toLocaleString("en-GB", {
                hour: "numeric",
                minute: "numeric",
                hourCycle: "h23",
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
                      {time}
                    </Typography>
                    <Typography
                      variant="h4"
                      component="p"
                      style={{ margin: `${theme.spacing(1)}px 0px` }}
                    >
                      {settings.temperature === "c"
                        ? Math.round((entry.temp - 273.15) * 10) / 10 + "°C"
                        : settings.temperature === "k"
                        ? Math.round(entry.temp * 10) / 10 + "K"
                        : Math.round(((entry.temp * 9) / 5 - 459.67) * 10) /
                            10 +
                          "°F"}
                    </Typography>
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
                      <Water width={15} />
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
            onClick={() => setRedirect(<Redirect push to={`${path}/hourly`} />)}
            color="primary"
          >
            Next 48 Hours
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default HourlyWidget;
