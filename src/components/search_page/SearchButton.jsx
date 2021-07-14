import React, { useState, useEffect, useRef, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import ExploreIcon from "@material-ui/icons/Explore";
import Coordinates from "coordinate-parser";
import { ApiKeysContext } from "../../App";

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

function handleClick({
  isSearchTypeCitySelected,
  listOfSuggestionsPersist,
  setErrorStateCityNameField,
  setErrorStateGeoCoordField,
  geoCoordsInFields,
  API_KEYS,
  setRedirect,
  suggestionCurrentlySelected,
}) {
  if (isSearchTypeCitySelected) {
    if (listOfSuggestionsPersist.current.length !== 0) {
      handleCityToGeoCoords(
        listOfSuggestionsPersist.current[suggestionCurrentlySelected],
        API_KEYS,
        setRedirect
      );
    } else {
      setErrorStateCityNameField(true);
    }
  } else {
    handleGeoCoords({
      geoCoordsInFields,
      setErrorStateGeoCoordField,
      API_KEY: API_KEYS.API_KEY_OPENWEATHERMAP,
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
  } catch (err) {}

  if (coordinates && onlyLatitudeThrewError && onlyLongitudeThrewError) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.getLatitude()}&lon=${coordinates.getLongitude()}&appid=${API_KEY}`
    );

    if (!response.ok) {
      setErrorStateGeoCoordField(true);
    } else {
      const data = await response.json();
      const verifyResponseById = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${data.id}&appid=${API_KEY}`
      );
      if (!verifyResponseById.ok) {
        setErrorStateGeoCoordField(true);
      } else {
        setRedirect(<Redirect push to={`/${data.id}`} />);
      }
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

  const API_KEYS = useContext(ApiKeysContext);
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
            API_KEYS,
            setRedirect,
            listOfSuggestionsPersist,
          })
        }
      >
        Search
      </Button>
    </>
  );
}

export default SearchButton;
