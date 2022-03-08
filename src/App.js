import React, {
  useState,
  useEffect,
  useReducer,
  lazy,
  Suspense,
  createContext,
} from "react";
import "./App.css";
import "fontsource-roboto";
import {
  HashRouter as Router,
  Switch as RouterSwitch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/header/Header";
import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
  IconButton,
  CircularProgress,
  responsiveFontSizes,
  useMediaQuery,
} from "@material-ui/core";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import {
  API_KEY_OPENWEATHERMAP,
  API_KEY_MAPBOX,
  API_KEY_HERE,
} from "./api/ENV.json";
import Tabs from "./components/main_page/Tabs";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const SearchPage = lazy(() => import("./components/search_page/SearchPage"));

const MainPage = lazy(() => import("./components/main_page/MainPage"));

function selectTheme(state, theme) {
  let darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#00acc1",
      },
      error: {
        main: "#e53935",
      },
      type: "dark",
    },
  });

  let lightTheme = createMuiTheme({
    palette: {
      background: {
        default: "#DCDCDC",
        paper: "#F5F5F5",
      },
      primary: {
        main: "#00bfa5",
      },
      type: "light",
    },
  });

  darkTheme = responsiveFontSizes(darkTheme);
  lightTheme = responsiveFontSizes(lightTheme);

  if (!state) {
    const themeInLocalStorage = localStorage.getItem("theme");

    switch (themeInLocalStorage) {
      case "dark":
        return darkTheme;
      case "light":
        return lightTheme;
      default:
        break;
    }
  }

  switch (theme) {
    case "dark":
      localStorage.setItem("theme", "dark");
      return darkTheme;
    case "light":
      localStorage.setItem("theme", "light");
      return lightTheme;
    default:
      return;
  }
}

function initialLoad(SET_API_KEY) {
  SET_API_KEY({ API_KEY_OPENWEATHERMAP, API_KEY_MAPBOX, API_KEY_HERE });
}

export const ApiKeysContext = createContext();
export const SettingsContext = createContext();

function App() {
  const [API_KEYS, SET_API_KEYS] = useState(null);
  const [settings, setSettings] = useState({
    temperature: JSON.parse(localStorage.getItem("units"))?.temperature ?? "c",
    distance: JSON.parse(localStorage.getItem("units"))?.distance ?? "m",
    speed: JSON.parse(localStorage.getItem("units"))?.speed ?? "kph",
    pressure: JSON.parse(localStorage.getItem("units"))?.pressure ?? "hpa",
  });

  useEffect(() => {
    initialLoad(SET_API_KEYS);
  }, []);

  const [theme, setTheme] = useReducer(selectTheme, selectTheme(null, "dark"));
  const [tabSelected, setTabSelected] = useState(null);

  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    localStorage.getItem("id") &&
      setRedirect(<Redirect to={`/${localStorage.getItem("id")}`} />);
  }, []);

  const breakpointMatches = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {redirect}
          <SettingsContext.Provider value={[settings, setSettings]}>
            <SimpleBar
              style={{
                maxHeight: "100vh",
                overflowX: "hidden",
              }}
              autoHide={false}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100vh",
                }}
              >
                <Header />
                <Route
                  path="/:id"
                  render={(props) => (
                    <Tabs {...props} tabSelected={tabSelected} />
                  )}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: "1",
                  }}
                >
                  {API_KEYS && (
                    <Suspense fallback={<CircularProgress />}>
                      <ApiKeysContext.Provider value={API_KEYS}>
                        <RouterSwitch>
                          <Route exact path="/" component={SearchPage} />
                          <Route
                            path="/:id"
                            render={(props) => (
                              <MainPage
                                {...props}
                                setTabSelected={setTabSelected}
                              />
                            )}
                          />
                        </RouterSwitch>
                      </ApiKeysContext.Provider>
                    </Suspense>
                  )}
                </div>
                <div
                  style={{
                    position: "fixed",
                    bottom: "0%",
                    right: "0%",
                    width: "80px",
                    textAlign: "right",
                  }}
                >
                  <IconButton
                    size={breakpointMatches ? "small" : "medium"}
                    style={{ margin: "0 10px 10px 0" }}
                    onClick={() => {
                      setTheme(
                        theme.palette.type === "dark" ? "light" : "dark"
                      );
                    }}
                  >
                    {theme.palette.type === "dark" ? (
                      <Brightness2Icon />
                    ) : (
                      <Brightness7Icon />
                    )}
                  </IconButton>
                </div>
              </div>
            </SimpleBar>
          </SettingsContext.Provider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
