import React, { useState, useEffect, useContext } from "react";
import { ApiKeyContext } from "../../App";
import { Switch as RouterSwitch, Route, useHistory } from "react-router-dom";
import Current from "./Current";
import Hourly from "./Hourly";
import Daily from "./Daily";
import { CircularProgress, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

async function fetchUsingOneCallAPI(id, setStationData, API_KEY) {
  // OneCallAPI only accepts geoCoord requests, so the coordinates are first found using the traditional api
  const currentWeatherDataAPIResponseJSON = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}`
    )
  ).json();

  const oneCallAPIResponseJSON = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeatherDataAPIResponseJSON.coord.lat}&lon=${currentWeatherDataAPIResponseJSON.coord.lon}&appid=${API_KEY}`
    )
  ).json();

  setStationData({
    ...oneCallAPIResponseJSON,
    city: currentWeatherDataAPIResponseJSON.name,
    country: currentWeatherDataAPIResponseJSON.sys.country,
  });
}

function MainPage({ match, setTabSelected }) {
  const [stationData, setStationData] = useState(null);
  const API_KEY = useContext(ApiKeyContext);

  const [snackbarOpen, setSnackbarOpen] = useState(true);

  useEffect(() => {
    fetchUsingOneCallAPI(match.params.id, setStationData, API_KEY);
  }, []);

  const history = useHistory();

  return (
    <>
      {stationData && (
        <RouterSwitch>
          <Route
            exact
            path={`/${match.params.id}`}
            render={(props) => (
              <Current
                setTabSelected={setTabSelected}
                {...props}
                stationData={stationData}
              />
            )}
          />
          <Route
            exact
            path={`/${match.params.id}/hourly`}
            render={(props) => (
              <Hourly
                setTabSelected={setTabSelected}
                {...props}
                stationData={stationData}
              />
            )}
          />
          <Route
            exact
            path={`/${match.params.id}/daily`}
            render={(props) => (
              <Daily
                setTabSelected={setTabSelected}
                {...props}
                stationData={stationData}
              />
            )}
          />
          <Route path="*" render={() => history.goBack()} />
        </RouterSwitch>
      )}
      {stationData && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={snackbarOpen}
          autoHideDuration={1500}
          onClose={() => setSnackbarOpen(false)}
        >
          <MuiAlert
            elevation={4}
            variant="filled"
            onClose={() => setSnackbarOpen(false)}
            severity="success"
          >
            Location Found
          </MuiAlert>
        </Snackbar>
      )}
      {!stationData ? <CircularProgress /> : null}
    </>
  );
}
export default MainPage;
