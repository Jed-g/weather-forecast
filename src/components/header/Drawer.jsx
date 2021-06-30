import React, { useState, useContext } from "react";
import {
  IconButton,
  SwipeableDrawer,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  ListSubheader,
  ListItemSecondaryAction,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import { Celsius } from "@styled-icons/remix-fill/Celsius";
import CloudIcon from "@material-ui/icons/Cloud";
import { Fahrenheit } from "@styled-icons/remix-fill/Fahrenheit";
import { SettingsContext } from "../../App";

const useStyles = makeStyles({
  menuIcon: {
    color: "rgba(0, 0, 0, 0.87)",
  },
  menuIconSeperator: {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "1.4rem",
  },
  settingButtons: {
    textTransform: "none",
  },
});

function Drawer() {
  const [settings, setSettings] = useContext(SettingsContext);

  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <>
      <IconButton onClick={() => setIsDrawerOpen(true)}>
        <Celsius width={18} className={classes.menuIcon} />
        <Typography className={classes.menuIconSeperator}>{"/"}</Typography>
        <Fahrenheit width={18} className={classes.menuIcon} />
      </IconButton>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        ModalProps={{ onBackdropClick: () => setIsDrawerOpen(false) }}
        anchor={"left"}
        open={isDrawerOpen}
        onOpen={() => setIsDrawerOpen(true)}
        onClose={() => setIsDrawerOpen(false)}
      >
        <List style={{ width: 250 }}>
          <ListItem>
            <ListItemText
              primary={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" component="p">
                    Weather Forecast
                  </Typography>
                  <CloudIcon style={{ marginLeft: 8 }} />
                </div>
              }
            />
          </ListItem>
          <Divider />
          <List subheader={<ListSubheader>Settings</ListSubheader>}>
            <ListItem>
              <ListItemText primary="Temperature" />
              <ListItemSecondaryAction>
                <ButtonGroup size="small" variant="text">
                  <Button
                    className={classes.settingButtons}
                    color={settings.temperature === "c" && "primary"}
                    onClick={() =>
                      setSettings((prev) => {
                        localStorage.setItem(
                          "units",
                          JSON.stringify({
                            ...prev,
                            temperature: "c",
                          })
                        );
                        return { ...prev, temperature: "c" };
                      })
                    }
                  >
                    °C
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.temperature === "f" && "primary"}
                    onClick={() =>
                      setSettings((prev) => {
                        localStorage.setItem(
                          "units",
                          JSON.stringify({
                            ...prev,
                            temperature: "f",
                          })
                        );
                        return { ...prev, temperature: "f" };
                      })
                    }
                  >
                    °F
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.temperature === "k" && "primary"}
                    onClick={() =>
                      setSettings((prev) => {
                        localStorage.setItem(
                          "units",
                          JSON.stringify({
                            ...prev,
                            temperature: "k",
                          })
                        );
                        return { ...prev, temperature: "k" };
                      })
                    }
                  >
                    K
                  </Button>
                </ButtonGroup>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Distance" />
              <ListItemSecondaryAction>
                <ButtonGroup size="small" variant="text">
                  <Button
                    className={classes.settingButtons}
                    color={settings.distance === "m" && "primary"}
                    onClick={() =>
                      setSettings((prev) => {
                        localStorage.setItem(
                          "units",
                          JSON.stringify({
                            ...prev,
                            distance: "m",
                          })
                        );
                        return { ...prev, distance: "m" };
                      })
                    }
                  >
                    m
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.distance === "km" && "primary"}
                    onClick={() =>
                      setSettings((prev) => {
                        localStorage.setItem(
                          "units",
                          JSON.stringify({
                            ...prev,
                            distance: "km",
                          })
                        );
                        return { ...prev, distance: "km" };
                      })
                    }
                  >
                    km
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.distance === "mi" && "primary"}
                    onClick={() =>
                      setSettings((prev) => {
                        localStorage.setItem(
                          "units",
                          JSON.stringify({
                            ...prev,
                            distance: "mi",
                          })
                        );
                        return { ...prev, distance: "mi" };
                      })
                    }
                  >
                    mi
                  </Button>
                </ButtonGroup>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Speed" />
              <ListItemSecondaryAction>
                <ButtonGroup size="small" variant="text">
                  <Button
                    className={classes.settingButtons}
                    color={settings.speed === "kph" && "primary"}
                    onClick={() =>
                      setSettings((prev) => {
                        localStorage.setItem(
                          "units",
                          JSON.stringify({
                            ...prev,
                            speed: "kph",
                          })
                        );
                        return { ...prev, speed: "kph" };
                      })
                    }
                  >
                    kph
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.speed === "mph" && "primary"}
                    onClick={() =>
                      setSettings((prev) => {
                        localStorage.setItem(
                          "units",
                          JSON.stringify({
                            ...prev,
                            speed: "mph",
                          })
                        );
                        return { ...prev, speed: "mph" };
                      })
                    }
                  >
                    mph
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.speed === "ms" && "primary"}
                    onClick={() =>
                      setSettings((prev) => {
                        localStorage.setItem(
                          "units",
                          JSON.stringify({
                            ...prev,
                            speed: "ms",
                          })
                        );
                        return { ...prev, speed: "ms" };
                      })
                    }
                  >
                    m/s
                  </Button>
                </ButtonGroup>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Pressure" />
              <ListItemSecondaryAction>
                <ButtonGroup size="small" variant="text">
                  <Button
                    className={classes.settingButtons}
                    color={settings.pressure === "hpa" && "primary"}
                    onClick={() =>
                      setSettings((prev) => {
                        localStorage.setItem(
                          "units",
                          JSON.stringify({
                            ...prev,
                            pressure: "hpa",
                          })
                        );
                        return { ...prev, pressure: "hpa" };
                      })
                    }
                  >
                    hPa
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.pressure === "atm" && "primary"}
                    onClick={() =>
                      setSettings((prev) => {
                        localStorage.setItem(
                          "units",
                          JSON.stringify({
                            ...prev,
                            pressure: "atm",
                          })
                        );
                        return { ...prev, pressure: "atm" };
                      })
                    }
                  >
                    atm
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.pressure === "inhg" && "primary"}
                    onClick={() =>
                      setSettings((prev) => {
                        localStorage.setItem(
                          "units",
                          JSON.stringify({
                            ...prev,
                            pressure: "inhg",
                          })
                        );
                        return { ...prev, pressure: "inhg" };
                      })
                    }
                  >
                    inHg
                  </Button>
                </ButtonGroup>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </List>
      </SwipeableDrawer>
    </>
  );
}

export default Drawer;
