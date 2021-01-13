import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import CloudIcon from "@material-ui/icons/Cloud";

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
          <Typography component="h3">1 Hour 5 Days...</Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="h2">
              Weather Forecast
            </Typography>
            <CloudIcon style={{ marginLeft: 8 }} />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
