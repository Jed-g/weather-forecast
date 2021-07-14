import React, { useRef, useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  TextField,
  InputAdornment,
  IconButton,
  Popper,
  Grow,
  MenuItem,
  ClickAwayListener,
  Paper,
  MenuList,
  LinearProgress,
  Divider,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";
import { ApiKeysContext } from "../../App";
import Coordinates from "coordinate-parser";

async function handleCityToGeoCoords(cityObject, API_KEYS, setRedirect) {
  let response = await fetch(
    `https://geocoder.ls.hereapi.com/6.2/geocode.json?locationid=${cityObject.locationId}&jsonattributes=1&gen=9&apiKey=${API_KEYS.API_KEY_HERE}`
  );
  let data = await response.json();
  const coords = data.response.view[0].result[0].location.displayPosition;

  let coordinates;
  try {
    coordinates = new Coordinates(`${coords.latitude}, ${coords.longitude}`);
  } catch (err) {}

  response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.getLatitude()}&lon=${coordinates.getLongitude()}&appid=${
      API_KEYS.API_KEY_OPENWEATHERMAP
    }`
  );

  data = await response.json();
  const verifyResponseById = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${data.id}&appid=${API_KEYS.API_KEY_OPENWEATHERMAP}`
  );
  if (verifyResponseById.ok) {
    setRedirect(<Redirect push to={`/${data.id}`} />);
  }
}

function CitySearchField({
  listOfSuggestions,
  setListOfSuggestions,
  errorStateCityNameField,
  setErrorStateCityNameField,
  cityNameInField,
  setCityNameInField,
  suggestionCurrentlySelected,
  setSuggestionCurrentlySelected,
}) {
  const textFieldInner = useRef();
  useEffect(() => textFieldInner.current.focus(), []);

  useEffect(() => setErrorStateCityNameField(false), []);

  useEffect(() => setSuggestionCurrentlySelected(0), []);

  const sourceAutocompleteLookup = useRef();

  const API_KEYS = useContext(ApiKeysContext);

  const [redirect, setRedirect] = useState(null);
  const [anchorElProgress, setAnchorElProgress] = useState(null);
  const openProgress = Boolean(anchorElProgress);
  const [anchorElList, setAnchorElList] = useState(null);
  const openList = Boolean(anchorElList);

  useEffect(() => {
    if (sourceAutocompleteLookup.current?.cancel) {
      sourceAutocompleteLookup.current.cancel();
    }
    async function fetchSuggestionList(cityNameInField) {
      sourceAutocompleteLookup.current = axios.CancelToken.source();
      const cancelToken = sourceAutocompleteLookup.current.token;
      const cityNameInFieldFiltered = cityNameInField.replace(
        /[#^$|/\\{}()?*+.[\]]/g,
        ""
      );
      const req = await axios
        .get(
          `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${cityNameInFieldFiltered}&apiKey=${API_KEYS.API_KEY_HERE}`,
          {
            cancelToken,
          }
        )
        .catch((err) => err);

      const suggestions = req?.data?.suggestions ?? [];
      console.log(suggestions);
      for (let i = 0; i < suggestions.length - 1; i++) {
        for (let j = i + 1; j < suggestions.length; j++) {
          if (
            suggestions[i]?.address?.county ===
              suggestions[j]?.address?.county &&
            suggestions[i]?.address?.county !== undefined
          ) {
            if (suggestions[i]?.label?.length < suggestions[j]?.label?.length) {
              suggestions[j] = null;
            } else {
              suggestions[i] = null;
            }
          }
        }
      }

      const filteredSuggestions = suggestions.filter(
        (suggestion) => suggestion !== null
      );

      console.log(filteredSuggestions);
      setListOfSuggestions(filteredSuggestions);
      filteredSuggestions?.length === 0 && setAnchorElProgress(null);
    }

    fetchSuggestionList(cityNameInField);
  }, [cityNameInField]);

  const textField = useRef();
  const [textFieldWidth, setTextFieldWidth] = useState(0);

  useEffect(() => {
    setTextFieldWidth(window.getComputedStyle(textField.current).width);
    const resizeEventFunction = () => {
      setTextFieldWidth(window.getComputedStyle(textField.current).width);
    };
    window.addEventListener("resize", resizeEventFunction);

    return () => window.removeEventListener("resize", resizeEventFunction);
  }, []);

  const listOfSuggestionsPersist = useRef();
  listOfSuggestionsPersist.current = listOfSuggestions;

  useEffect(() => {
    const eventListenerFunction = function (e) {
      document.removeEventListener("keydown", eventListenerFunction);

      switch (e.key) {
        case "ArrowUp":
          setSuggestionCurrentlySelected((prev) =>
            prev - 1 >= 0 ? prev - 1 : prev
          );
          break;
        case "ArrowDown":
          setSuggestionCurrentlySelected((prev) =>
            prev + 1 < listOfSuggestionsPersist.current.length ? prev + 1 : prev
          );
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", eventListenerFunction);

    const addKeydownEventListenerOnKeyupFunction = function () {
      document.addEventListener("keydown", eventListenerFunction);
    };

    document.addEventListener("keyup", addKeydownEventListenerOnKeyupFunction);

    return () => {
      document.removeEventListener("keydown", eventListenerFunction);
      document.removeEventListener(
        "keyup",
        addKeydownEventListenerOnKeyupFunction
      );
    };
  }, []);

  const endAdornment = () => {
    if (cityNameInField) {
      return (
        <InputAdornment position="end">
          <IconButton
            onClick={() => {
              setCityNameInField("");
            }}
            onMouseDown={(e) => e.preventDefault()}
            color="secondary"
          >
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      {redirect}
      <ClickAwayListener
        onClickAway={() => {
          setAnchorElProgress(null);
          setAnchorElList(null);
        }}
      >
        <div>
          <TextField
            error={errorStateCityNameField}
            ref={textField}
            InputProps={{ endAdornment: endAdornment() }}
            value={cityNameInField}
            onChange={(e) => {
              setSuggestionCurrentlySelected(0);
              setCityNameInField(e.target.value);
              setErrorStateCityNameField(false);
              cityNameInField && setAnchorElProgress(textField.current);
              setAnchorElList(textField.current);
            }}
            variant="outlined"
            inputRef={textFieldInner}
            fullWidth
            label="City Name"
            onClick={(e) => {
              cityNameInField && setAnchorElProgress(e.currentTarget);
              setAnchorElList(e.currentTarget);
              setErrorStateCityNameField(false);
            }}
          />
          {
            <Popper
              style={{ zIndex: 1500, width: textFieldWidth }}
              open={openProgress}
              anchorEl={anchorElProgress}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper style={{ height: "30px" }}>
                    <LinearProgress
                      style={{
                        width: `calc(${textFieldWidth} - 40px)`,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </Paper>
                </Grow>
              )}
            </Popper>
          }
          {listOfSuggestions.length !== 0 && (
            <Popper
              style={{ zIndex: 1500, width: textFieldWidth }}
              open={openList}
              anchorEl={anchorElList}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <MenuList>
                      {listOfSuggestions.map((cityObject, index) => {
                        return (
                          <div key={cityObject.locationId}>
                            <MenuItem
                              onClick={() =>
                                handleCityToGeoCoords(
                                  cityObject,
                                  API_KEYS,
                                  setRedirect
                                )
                              }
                              selected={index === suggestionCurrentlySelected}
                            >
                              {cityObject.label}
                            </MenuItem>
                            {listOfSuggestions.length - 1 === index || (
                              <Divider />
                            )}
                          </div>
                        );
                      })}
                    </MenuList>
                  </Paper>
                </Grow>
              )}
            </Popper>
          )}
        </div>
      </ClickAwayListener>
    </>
  );
}

export default CitySearchField;
