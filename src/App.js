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
import Header from "./components/Header";
import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import { API_KEY } from "./api/ENV.json";

const SearchPage = lazy(() => import("./components/search_page/SearchPage"));

const MainPage = lazy(() => import("./components/main_page/MainPage"));

function selectTheme(state, theme) {
  const darkTheme = createMuiTheme({
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

  const lightTheme = createMuiTheme({
    palette: {
      background: {
        default: "#f8f9fa",
        paper: "#ffffff",
      },
      primary: {
        main: "#00bfa5",
      },
    },
    overrides: {
      MuiButton: {
        root: {
          "&:hover": {
            backgroundColor: "#EEEEEE",
          },
        },
        contained: {
          backgroundColor: "#BDBDBD",
        },
      },
    },
  });

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

function App() {
  const [API_KEY, SET_API_KEY] = useState(null);

  useEffect(() => {
    initialLoad(SET_API_KEY);
  }, []);

  const [theme, setTheme] = useReducer(selectTheme, selectTheme(null, "dark"));

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
              {API_KEY && (
                <Suspense fallback={<CircularProgress />}>
                  <ApiKeyContext.Provider value={API_KEY}>
                    <RouterSwitch>
                      <Route
                        exact
                        path="/"
                        render={(props) => <SearchPage {...props} />}
                      />
                      <Route
                        path="/:id"
                        render={(props) => <MainPage {...props} />}
                      />
                    </RouterSwitch>
                  </ApiKeyContext.Provider>
                </Suspense>
              )}
            </div>
            <div style={{ width: "100vw", textAlign: "right" }}>
              <IconButton
                style={{ margin: "10px" }}
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
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
