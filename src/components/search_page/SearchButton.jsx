import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import ExploreIcon from "@material-ui/icons/Explore";
import Coordinates from "coordinate-parser";

function waitForExecToFinish(executingAutocompleteLookup) {
  return new Promise((resolve) => {
    const intervalCheck = setInterval(() => {
      if (executingAutocompleteLookup.current === false) {
        clearInterval(intervalCheck);
        resolve();
      }
    }, 10);
  });
}

async function handleClick({
  isSearchTypeCitySelected,
  listOfSuggestionsPersist,
  setErrorStateCityNameField,
  setErrorStateGeoCoordField,
  geoCoordsInFields,
  executingAutocompleteLookup,
  API_KEY,
  setRedirect,
  suggestionCurrentlySelected,
}) {
  if (isSearchTypeCitySelected) {
    executingAutocompleteLookup.current &&
      (await waitForExecToFinish(executingAutocompleteLookup));

    if (listOfSuggestionsPersist.current.length !== 0) {
      setRedirect(
        <Redirect
          push
          to={`/${listOfSuggestionsPersist.current[suggestionCurrentlySelected].city.id}`}
        />
      );
    } else {
      setErrorStateCityNameField(true);
    }
  } else {
    handleGeoCoords({
      geoCoordsInFields,
      setErrorStateGeoCoordField,
      API_KEY,
      setRedirect,
    });
  }
}

async function handleGeoCoords({
  geoCoordsInFields,
  setErrorStateGeoCoordField,
  API_KEY,
  setRedirect,
}) {
  let onlyLatitudeThrewError = false;
  try {
    new Coordinates(geoCoordsInFields.latitude);
  } catch (err) {
    onlyLatitudeThrewError = true;
  }

  let onlyLongitudeThrewError = false;
  try {
    new Coordinates(geoCoordsInFields.longitude);
  } catch (err) {
    onlyLongitudeThrewError = true;
  }

  let coordinates;
  try {
    coordinates = new Coordinates(
      `${geoCoordsInFields.latitude}, ${geoCoordsInFields.longitude}`
    );
  } catch (err) {
    console.error(err);
  }

  if (coordinates && onlyLatitudeThrewError && onlyLongitudeThrewError) {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.getLatitude()}&lon=${coordinates.getLongitude()}&appid=${API_KEY}`
    );
    if (!response.ok) {
      setErrorStateGeoCoordField(true);
    } else {
      const data = await response.json();
      setRedirect(<Redirect push to={`/${data.id}`} />);
    }
  } else {
    setErrorStateGeoCoordField(true);
  }
}

function SearchButton(props) {
  const buttonRef = useRef();
  const [redirect, setRedirect] = useState(null);

  const listOfSuggestionsPersist = useRef();
  listOfSuggestionsPersist.current = props.listOfSuggestions;

  useEffect(() => {
    const eventListenerFunction = function (e) {
      document.removeEventListener("keydown", eventListenerFunction);
      if (e.key === "Enter") {
        buttonRef.current && buttonRef.current.click();
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

  return (
    <>
      {redirect}
      <Button
        ref={buttonRef}
        fullWidth
        startIcon={<ExploreIcon />}
        color="primary"
        variant="contained"
        onClick={() =>
          handleClick({
            ...props,
            setRedirect: setRedirect,
            listOfSuggestionsPersist: listOfSuggestionsPersist,
          })
        }
      >
        Search
      </Button>
    </>
  );
}

export default SearchButton;
