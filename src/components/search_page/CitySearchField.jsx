import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  makeStyles,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import diacritics from "diacritics";

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
  executing
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
            executing
          ),
        breakBetweenIterationsInMs
      );
    } else {
      setListOfSuggestions.current(bestFitArray);
      executing.current = false;
    }
  }
}

const useStyles = makeStyles({
  menuItemBorderBottom: {
    borderBottom: "1px solid #808080",
  },
});

function CitySearchField({
  CITY_LIST,
  listOfSuggestions,
  setListOfSuggestions,
  errorStateCityNameField,
  setErrorStateCityNameField,
}) {
  const classes = useStyles();

  const textFieldInner = useRef();
  useEffect(() => textFieldInner.current.focus(), []);

  const [cityNameInField, setCityNameInField] = useState("");

  const setListOfSuggestionsPersist = useRef(setListOfSuggestions);
  setListOfSuggestionsPersist.current = setListOfSuggestions;

  const executing = useRef(false);
  const cancelExec = useRef(false);

  useEffect(() => {
    const breakBetweenIterationsInMs = 5;
    cancelExec.current = executing.current;
    if (CITY_LIST && cityNameInField.replace(/[{}()?*+.[\]]/g, "")) {
      setTimeout(() => {
        executing.current = true;
        cancelExec.current = false;
        calculateClosestMatches(
          [],
          CITY_LIST,
          cityNameInField.replace(/[{}()?*+.[\]]/g, ""),
          5,
          15,
          0,
          setListOfSuggestionsPersist,
          breakBetweenIterationsInMs,
          cancelExec,
          executing
        );
      }, 2 * breakBetweenIterationsInMs);
    } else {
      setListOfSuggestionsPersist.current([]);
    }
  }, [cityNameInField, CITY_LIST]);

  const textField = useRef();
  const [textFieldWidth, setTextFieldWidth] = useState(0);
  const setTextFieldWidthPersist = useRef(setTextFieldWidth);
  setTextFieldWidthPersist.current = setTextFieldWidth;

  useEffect(() => {
    setTextFieldWidthPersist.current(
      window.getComputedStyle(textField.current).width
    );
    const resizeEventFunction = (e) => {
      setTextFieldWidthPersist.current(
        window.getComputedStyle(textField.current).width
      );
    };
    window.addEventListener("resize", resizeEventFunction);

    return () => window.removeEventListener("resize", resizeEventFunction);
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
      return;
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <TextField
        error={errorStateCityNameField}
        ref={textField}
        InputProps={{ endAdornment: endAdornment() }}
        value={cityNameInField}
        onChange={(e) => {
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
      <Popper
        style={{ zIndex: 2, width: textFieldWidth }}
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
              <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <MenuList>
                  {placement === "bottom"
                    ? listOfSuggestions.map((cityObject, index) => {
                        return (
                          <Link
                            to={`/${cityObject.city.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <MenuItem
                              selected={index === 0}
                              className={
                                listOfSuggestions.length - 1 === index
                                  ? null
                                  : classes.menuItemBorderBottom
                              }
                              value={cityObject.city.id}
                              key={cityObject.city.id}
                            >
                              {cityObject.city.name}
                              {cityObject.city.state &&
                                `, ${cityObject.city.state}`}
                              {cityObject.city.country &&
                                `, ${cityObject.city.country}`}
                            </MenuItem>
                          </Link>
                        );
                      })
                    : listOfSuggestions
                        .slice()
                        .reverse()
                        .map((cityObject, index) => {
                          return (
                            <Link
                              to={`/${cityObject.city.id}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <MenuItem
                                selected={
                                  index === listOfSuggestions.length - 1
                                }
                                className={
                                  listOfSuggestions.length - 1 === index
                                    ? null
                                    : classes.menuItemBorderBottom
                                }
                                value={cityObject.city.id}
                                key={cityObject.city.id}
                              >
                                {cityObject.city.name}
                                {cityObject.city.state &&
                                  `, ${cityObject.city.state}`}
                                {cityObject.city.country &&
                                  `, ${cityObject.city.country}`}
                              </MenuItem>
                            </Link>
                          );
                        })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default CitySearchField;
