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
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import CloudIcon from "@material-ui/icons/Cloud";
import { SettingsContext } from "../../App";

const useStyles = makeStyles({
  menuIcon: {
    color: "rgba(0, 0, 0, 0.87)",
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
        <MenuRoundedIcon className={classes.menuIcon} />
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
                      setSettings((prev) => ({ ...prev, temperature: "c" }))
                    }
                  >
                    °C
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.temperature === "f" && "primary"}
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, temperature: "f" }))
                    }
                  >
                    °F
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.temperature === "k" && "primary"}
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, temperature: "k" }))
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
                      setSettings((prev) => ({ ...prev, distance: "m" }))
                    }
                  >
                    m
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.distance === "km" && "primary"}
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, distance: "km" }))
                    }
                  >
                    km
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.distance === "mi" && "primary"}
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, distance: "mi" }))
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
                      setSettings((prev) => ({ ...prev, speed: "kph" }))
                    }
                  >
                    kph
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.speed === "mph" && "primary"}
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, speed: "mph" }))
                    }
                  >
                    mph
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.speed === "ms" && "primary"}
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, speed: "ms" }))
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
                      setSettings((prev) => ({ ...prev, pressure: "hpa" }))
                    }
                  >
                    hPa
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.pressure === "atm" && "primary"}
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, pressure: "atm" }))
                    }
                  >
                    atm
                  </Button>
                  <Button
                    className={classes.settingButtons}
                    color={settings.pressure === "inhg" && "primary"}
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, pressure: "inhg" }))
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
