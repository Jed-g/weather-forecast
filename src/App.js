import React, { useState, useEffect, useReducer, useRef } from "react";
import "./App.css";
import "fontsource-roboto";
import {
  HashRouter as Router,
  Switch as RouterSwitch,
  Route,
} from "react-router-dom";
import SearchPage from "./components/search_page/SearchPage";
import MainPage from "./components/main_page/MainPage";
import Header from "./components/Header";
import { ThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
import { API_KEY } from "./api/ENV.json";
import CITY_LIST from "./api/city.list.min.json";

function selectTheme(theme) {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#00acc1",
      },
      secondary: {
        main: "#e53935",
      },
      type: "dark",
    },
  });

  const lightTheme = createMuiTheme({});

  switch (theme) {
    case "dark":
      return darkTheme;
    case "light":
      return lightTheme;
    default:
      return;
  }
}

function initialLoad(SET_API_KEY, SET_CITY_LIST) {
  SET_API_KEY(API_KEY);
  SET_CITY_LIST(CITY_LIST);
}

function App() {
  const [API_KEY, SET_API_KEY] = useState(false);
  const setApiKeyPersist = useRef(SET_API_KEY);
  const [CITY_LIST, SET_CITY_LIST] = useState(false);
  const setCityListPersist = useRef(SET_CITY_LIST);

  setApiKeyPersist.current = SET_API_KEY;
  setCityListPersist.current = SET_CITY_LIST;

  useEffect(() => {
    initialLoad(setApiKeyPersist.current, setCityListPersist.current);
  }, []);

  const [theme, setTheme] = useReducer(selectTheme, selectTheme("dark"));

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Header />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: "1",
              }}
            >
              <RouterSwitch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <SearchPage
                      {...props}
                      API_KEY={API_KEY}
                      CITY_LIST={CITY_LIST}
                    />
                  )}
                />
                <Route
                  path="/:id"
                  render={(props) => <MainPage {...props} API_KEY={API_KEY} />}
                />
              </RouterSwitch>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
