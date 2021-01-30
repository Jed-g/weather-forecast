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
} from "react-router-dom";
import Header from "./components/header/Header";
import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
  IconButton,
  CircularProgress,
  responsiveFontSizes,
} from "@material-ui/core";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import { API_KEY } from "./api/ENV.json";
import Tabs from "./components/main_page/Tabs";

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
        default: "#f8f9fa",
        paper: "#ffffff",
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
  SET_API_KEY(API_KEY);
}

export const ApiKeyContext = createContext();
export const SettingsContext = createContext();

function App() {
  const [API_KEY, SET_API_KEY] = useState(null);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    initialLoad(SET_API_KEY);
  }, []);

  const [theme, setTheme] = useReducer(selectTheme, selectTheme(null, "dark"));
  const [tabSelected, setTabSelected] = useState(null);

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
            }}
          >
            <SettingsContext.Provider value={[settings, setSettings]}>
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
                {API_KEY && (
                  <Suspense fallback={<CircularProgress />}>
                    <ApiKeyContext.Provider value={API_KEY}>
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
                    </ApiKeyContext.Provider>
                  </Suspense>
                )}
              </div>
              <div style={{ width: "100vw", textAlign: "right" }}>
                <IconButton
                  style={{ margin: "0 10px 10px 0" }}
                  onClick={() => {
                    setTheme(theme.palette.type === "dark" ? "light" : "dark");
                  }}
                >
                  {theme.palette.type === "dark" ? (
                    <Brightness2Icon />
                  ) : (
                    <Brightness7Icon />
                  )}
                </IconButton>
              </div>
            </SettingsContext.Provider>
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
