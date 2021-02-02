import React, { useState, useEffect, useContext } from "react";
import { ApiKeysContext } from "../../App";
import { Switch as RouterSwitch, Route, useHistory } from "react-router-dom";
import Current from "./Current";
import Hourly from "./Hourly";
import Daily from "./Daily";
import { CircularProgress, Snackbar, Grid } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Map from "./Map";

async function fetchUsingOneCallAPI(id, setStationData, API_KEY, history) {
  // OneCallAPI only accepts geoCoord requests, so the coordinates are first found using the traditional api
  const currentWeatherDataAPIResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}`
  );

  if (!currentWeatherDataAPIResponse.ok) {
    history.push("/");
    return;
  }

  const currentWeatherDataAPIResponseJSON = await currentWeatherDataAPIResponse.json();

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
  const API_KEY = useContext(ApiKeysContext).API_KEY_OPENWEATHERMAP;

  const [snackbarOpen, setSnackbarOpen] = useState(true);

  const history = useHistory();

  useEffect(() => {
    fetchUsingOneCallAPI(match.params.id, setStationData, API_KEY, history);
  }, []);

  return (
    <>
      {stationData && (
        <>
          <Grid
            justify="center"
            container
            style={{ width: "100%", height: "100%", margin: "40px 0 20px" }}
          >
            <Grid
              container
              item
              xs={12}
              lg={8}
              alignItems="flex-start"
              alignContent="flex-start"
              spacing={4}
            >
              <Grid item md={8} xs={12}>
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
                  <Route path="*" render={() => history.push("/")} />
                </RouterSwitch>
              </Grid>
              <Grid item md={4} xs={12}>
                <Map coords={{ lat: stationData.lat, lon: stationData.lon }} />
              </Grid>
            </Grid>
          </Grid>
        </>
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
