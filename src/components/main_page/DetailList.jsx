import React, { useContext } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Typography,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { SettingsContext } from "../../App";
import { TemperatureLow } from "@styled-icons/fa-solid/TemperatureLow";
import { Direction } from "@styled-icons/entypo/Direction";
import { Wind } from "@styled-icons/boxicons-regular/Wind";
import { Sun } from "@styled-icons/heroicons-outline/Sun";
import { Water } from "@styled-icons/ionicons-outline/Water";
import { Visibility } from "@styled-icons/material-outlined/Visibility";
import { ArrowsCompress } from "@styled-icons/foundation/ArrowsCompress";
import { CloudRain as Rain } from "@styled-icons/boxicons-regular/CloudRain";

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: 8,
  },
  list: {
    padding: 0,
  },
  medium: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.primary,
  },
  small: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.primary,
  },
}));

function DetailList({ stationData }) {
  const classes = useStyles();
  const [settings] = useContext(SettingsContext);
  const theme = useTheme();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <List
        className={classes.list}
        style={{
          minWidth: 200,
          margin: `0px ${theme.spacing(2)}px`,
          flexGrow: "1",
        }}
      >
        <Divider />
        <ListItem className={classes.listItem}>
          <ListItemText>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TemperatureLow width={22} />
              <Typography>{"\u00A0\u00A0"}Day/Night</Typography>
            </div>
          </ListItemText>
          <ListItemSecondaryAction>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography>
                {settings.temperature === "c"
                  ? Math.round(stationData.daily[0].temp.day - 273.15) + "°C"
                  : settings.temperature === "k"
                  ? Math.round(stationData.daily[0].temp.day) + "K"
                  : Math.round(
                      (stationData.daily[0].temp.day * 9) / 5 - 459.67
                    ) + "°F"}
              </Typography>
              <Typography className={classes.medium}>
                {"\u00A0/\u00A0"}
              </Typography>
              <Typography className={classes.small}>
                {settings.temperature === "c"
                  ? Math.round(stationData.daily[0].temp.night - 273.15) + "°C"
                  : settings.temperature === "k"
                  ? Math.round(stationData.daily[0].temp.night) + "K"
                  : Math.round(
                      (stationData.daily[0].temp.night * 9) / 5 - 459.67
                    ) + "°F"}
              </Typography>
            </div>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem className={classes.listItem}>
          <ListItemText>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Rain width={25} style={{ marginLeft: -3 }} />
              <Typography>{"\u00A0\u00A0"}Precipitation</Typography>
            </div>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography>
              {Math.round(stationData.daily[0].pop * 100) + "%"}
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem className={classes.listItem}>
          <ListItemText>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ArrowsCompress width={22} />
              <Typography>{"\u00A0\u00A0"}Pressure</Typography>
            </div>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography>
              {settings.pressure === "hpa"
                ? stationData.daily[0].pressure + " hPa"
                : settings.pressure === "atm"
                ? Math.round(
                    (stationData.daily[0].pressure * 1000) / 1013.2501
                  ) /
                    1000 +
                  " atm"
                : Math.round((stationData.daily[0].pressure * 100) / 33.86) /
                    100 +
                  " inHg"}
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem className={classes.listItem}>
          <ListItemText>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Visibility width={22} />
              <Typography>{"\u00A0\u00A0"}Visibility</Typography>
            </div>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography>
              {stationData.current.visibility >= 10000
                ? settings.distance === "m"
                  ? ">" + stationData.current.visibility + "m"
                  : settings.distance === "km"
                  ? ">" +
                    Math.round((stationData.current.visibility * 10) / 1000) /
                      10 +
                    "km"
                  : ">" +
                    Math.round((stationData.current.visibility * 10) / 1609) /
                      10 +
                    "mi"
                : settings.distance === "m"
                ? stationData.current.visibility + "m"
                : settings.distance === "km"
                ? Math.round((stationData.current.visibility * 10) / 1000) /
                    10 +
                  "km"
                : Math.round((stationData.current.visibility * 10) / 1609) /
                    10 +
                  "mi"}
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <List
        className={classes.list}
        style={{
          minWidth: 200,
          margin: `0px ${theme.spacing(2)}px`,
          flexGrow: "1",
        }}
      >
        <Divider />
        <ListItem className={classes.listItem}>
          <ListItemText>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Water width={22} />
              <Typography>{"\u00A0\u00A0"}Dew Point</Typography>
            </div>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography>
              {settings.temperature === "c"
                ? Math.round(stationData.daily[0].dew_point - 273.15) + "°C"
                : settings.temperature === "k"
                ? Math.round(stationData.daily[0].dew_point) + "K"
                : Math.round(
                    (stationData.daily[0].dew_point * 9) / 5 - 459.67
                  ) + "°F"}
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem className={classes.listItem}>
          <ListItemText>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Sun width={22} />
              <Typography>{"\u00A0\u00A0"}UV Index</Typography>
            </div>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography>{stationData.daily[0].uvi}</Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem className={classes.listItem}>
          <ListItemText>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Wind width={22} />
              <Typography>{"\u00A0\u00A0"}Wind Speed</Typography>
            </div>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography>
              {settings.speed === "ms"
                ? Math.round(stationData.daily[0].wind_speed * 10) / 10 + "m/s"
                : settings.speed === "kph"
                ? Math.round(stationData.daily[0].wind_speed * 3.6 * 10) / 10 +
                  "kph"
                : Math.round(stationData.daily[0].wind_speed * 2.237 * 10) /
                    10 +
                  "mph"}
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem className={classes.listItem}>
          <ListItemText>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Direction width={22} />
              <Typography>{"\u00A0\u00A0"}Wind Direction</Typography>
            </div>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography>{stationData.daily[0].wind_deg}°</Typography>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}

export default DetailList;
