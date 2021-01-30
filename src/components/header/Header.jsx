import React from "react";
import { AppBar, Toolbar, Typography, Button, Hidden } from "@material-ui/core";
import { Link } from "react-router-dom";
import CloudIcon from "@material-ui/icons/Cloud";
import SearchIcon from "@material-ui/icons/Search";
import Drawer from "./Drawer";

function Header() {
  return (
    <AppBar position="static" style={{ width: "100vw" }}>
      <Toolbar>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Drawer />
          <Hidden mdUp>
            <Link style={{ textDecoration: "none" }} to="/">
              <Button size="small" variant="contained">
                New Search
              </Button>
            </Link>
          </Hidden>
          <Hidden smDown>
            <Link style={{ textDecoration: "none" }} to="/">
              <Button endIcon={<SearchIcon />} variant="contained">
                New Search
              </Button>
            </Link>
          </Hidden>
        </div>
        <Hidden xsDown>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="h2">
              Weather Forecast
            </Typography>
            <CloudIcon style={{ marginLeft: 8 }} />
          </div>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
