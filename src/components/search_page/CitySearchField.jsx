import React, { useRef, useEffect, useState } from "react";
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
import diacritics from "diacritics";

import CITY_LIST from "../../api/city.list.min.json";

const removeDiacritics = diacritics.remove;

function calculateClosestMatches(
  bestFitArray,
  cityList,
  cityName,
  howManyMax,
  steps,
  iteration,
  setListOfSuggestions,
  breakBetweenIterationsInMs,
  cancelExec,
  executingAutocompleteLookup
) {
  cityList
    .slice(
      Math.floor((iteration * cityList.length) / steps),
      Math.floor(((iteration + 1) * cityList.length) / steps)
    )
    .forEach((city) => {
      let min = Infinity;
      const posOfCity = city.name.toLowerCase().search(cityName.toLowerCase());
      if (posOfCity !== -1) {
        if (city.name.length - cityName.length - 1 / (1 + posOfCity) < min) {
          min = city.name.length - cityName.length - 1 / (1 + posOfCity);
        }
      }

      const posOfCityWithoutDiacritics = removeDiacritics(city.name)
        .toLowerCase()
        .search(removeDiacritics(cityName).toLowerCase());
      if (posOfCityWithoutDiacritics !== -1) {
        if (
          (city.name.length -
            cityName.length -
            1 / (1 + posOfCityWithoutDiacritics)) *
            1.25 <
          min
        ) {
          min =
            (city.name.length -
              cityName.length -
              1 / (1 + posOfCityWithoutDiacritics)) *
            1.25;
        }
      }

      if (min !== Infinity) {
        let indexToInsertAt = 0;
        for (let i = 0; i < bestFitArray.length; i++) {
          if (min >= bestFitArray[i].fitValue) {
            indexToInsertAt++;
          }
        }
        bestFitArray.splice(indexToInsertAt, 0, {
          fitValue: min,
          city: city,
        });
      }

      if (bestFitArray.length > howManyMax) {
        let max = -Infinity;
        let indexToDelete = null;
        bestFitArray.forEach((cityObject, index) => {
          if (cityObject.fitValue > -0.5 && cityObject.fitValue >= max) {
            max = cityObject.fitValue;
            indexToDelete = index;
          }
        });
        indexToDelete && bestFitArray.splice(indexToDelete, 1);
      }
    });
  if (!cancelExec.current) {
    if (iteration < steps - 1) {
      setTimeout(
        () =>
          calculateClosestMatches(
            bestFitArray,
            cityList,
            cityName,
            howManyMax,
            steps,
            iteration + 1,
            setListOfSuggestions,
            breakBetweenIterationsInMs,
            cancelExec,
            executingAutocompleteLookup
          ),
        breakBetweenIterationsInMs
      );
    } else {
      executingAutocompleteLookup.current = false;
      if (cityName) {
        setListOfSuggestions(bestFitArray);
      } else {
        setListOfSuggestions([]);
      }
    }
  }
}

function CitySearchField({
  listOfSuggestions,
  setListOfSuggestions,
  errorStateCityNameField,
  setErrorStateCityNameField,
  cityNameInField,
  setCityNameInField,
  executingAutocompleteLookup,
  suggestionCurrentlySelected,
  setSuggestionCurrentlySelected,
}) {
  const textFieldInner = useRef();
  useEffect(() => textFieldInner.current.focus(), []);

  useEffect(() => setErrorStateCityNameField(false), []);

  useEffect(() => setSuggestionCurrentlySelected(0), []);

  const cancelExec = useRef(false);

  useEffect(() => {
    const breakBetweenIterationsInMs = 5;
    cancelExec.current = executingAutocompleteLookup.current;
    if (CITY_LIST) {
      setTimeout(() => {
        executingAutocompleteLookup.current = true;
        setListOfSuggestions((prev) => prev);
        cancelExec.current = false;
        calculateClosestMatches(
          [],
          CITY_LIST,
          cityNameInField.replace(/[#^$|/\\{}()?*+.[\]]/g, ""),
          5,
          30,
          0,
          setListOfSuggestions,
          breakBetweenIterationsInMs,
          cancelExec,
          executingAutocompleteLookup
        );
      }, 2 * breakBetweenIterationsInMs);
    }
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

  const [redirect, setRedirect] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      {redirect}
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
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
              setAnchorEl(textField.current);
            }}
            variant="outlined"
            inputRef={textFieldInner}
            fullWidth
            label="City Name"
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              setErrorStateCityNameField(false);
            }}
          />
          {executingAutocompleteLookup.current && (
            <Popper
              style={{ zIndex: 1500, width: textFieldWidth }}
              open={open}
              anchorEl={anchorEl}
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
          )}
          {!executingAutocompleteLookup.current &&
            listOfSuggestions.length !== 0 && (
              <Popper
                style={{ zIndex: 1500, width: textFieldWidth }}
                open={open}
                anchorEl={anchorEl}
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
                            <div key={cityObject.city.id}>
                              <MenuItem
                                onClick={() =>
                                  executingAutocompleteLookup.current ||
                                  setRedirect(
                                    <Redirect
                                      push
                                      to={`/${cityObject.city.id}`}
                                    />
                                  )
                                }
                                selected={index === suggestionCurrentlySelected}
                              >
                                {cityObject.city.name}
                                {cityObject.city.state &&
                                  `, ${cityObject.city.state}`}
                                {cityObject.city.country &&
                                  `, ${cityObject.city.country}`}
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
