import React, { useState } from "react";
import {
  Tabs as MuiTabs,
  Tab,
  AppBar,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";

function Tabs({ tabSelected, match }) {
  const theme = useTheme();
  const breakpointMatches = useMediaQuery(theme.breakpoints.down("xs"));

  const [redirect, setRedirect] = useState(null);

  return (
    <>
      {redirect}
      <AppBar position="static" color="default">
        <MuiTabs
          indicatorColor="primary"
          variant={breakpointMatches ? "fullWidth" : "standard"}
          centered
          value={tabSelected}
        >
          <Tab
            label="Current"
            onClick={() => {
              setRedirect(<Redirect to={`/${match.params.id}`} />);
            }}
          />
          <Tab
            label="Hourly"
            onClick={() => {
              setRedirect(<Redirect to={`/${match.params.id}/hourly`} />);
            }}
          />
          <Tab
            label="Daily"
            onClick={() => {
              setRedirect(<Redirect to={`/${match.params.id}/daily`} />);
            }}
          />
        </MuiTabs>
      </AppBar>
    </>
  );
}

export default Tabs;
