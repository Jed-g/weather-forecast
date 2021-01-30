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
              <ListItemText primary="test1" />
              <ListItemSecondaryAction>
                <ButtonGroup size="small" variant="text">
                  <Button className={classes.settingButtons} color="primary">
                    Km/h
                  </Button>
                  <Button className={classes.settingButtons}>Mp/h</Button>
                  <Button className={classes.settingButtons}>m/s</Button>
                </ButtonGroup>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="test2" />
              <ListItemSecondaryAction>
                <ButtonGroup size="small" variant="text">
                  <Button className={classes.settingButtons} color="primary">
                    Km/h
                  </Button>
                  <Button className={classes.settingButtons}>Mp/h</Button>
                  <Button className={classes.settingButtons}>m/s</Button>
                </ButtonGroup>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="test3" />
              <ListItemSecondaryAction>
                <ButtonGroup size="small" variant="text">
                  <Button className={classes.settingButtons} color="primary">
                    Km/h
                  </Button>
                  <Button className={classes.settingButtons}>Mp/h</Button>
                  <Button className={classes.settingButtons}>m/s</Button>
                </ButtonGroup>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="test4" />
              <ListItemSecondaryAction>
                <ButtonGroup size="small" variant="text">
                  <Button className={classes.settingButtons} color="primary">
                    Km/h
                  </Button>
                  <Button className={classes.settingButtons}>Mp/h</Button>
                  <Button className={classes.settingButtons}>m/s</Button>
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
