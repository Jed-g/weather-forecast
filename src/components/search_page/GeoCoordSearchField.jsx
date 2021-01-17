import React, { useEffect, useRef } from "react";
import { Grid, TextField, InputAdornment, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

function GeoCoordSearchField({
  geoCoordsInFields,
  setGeoCoordsInFields,
  errorStateGeoCoordField,
  setErrorStateGeoCoordField,
}) {
  const latitudeBox = useRef();
  useEffect(() => latitudeBox.current.focus(), []);

  useEffect(() => setErrorStateGeoCoordField(false), []);

  const endAdornmentLatitude = () => {
    if (geoCoordsInFields.latitude) {
      return (
        <InputAdornment position="end">
          <IconButton
            onClick={() =>
              setGeoCoordsInFields((prevState) => {
                return { ...prevState, latitude: "" };
              })
            }
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

  const endAdornmentLongitude = () => {
    if (geoCoordsInFields.longitude) {
      return (
        <InputAdornment position="end">
          <IconButton
            onClick={() =>
              setGeoCoordsInFields((prevState) => {
                return { ...prevState, longitude: "" };
              })
            }
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
    <Grid container spacing={1}>
      <Grid item xs={12} lg={6}>
        <TextField
          error={errorStateGeoCoordField}
          onClick={() => setErrorStateGeoCoordField(false)}
          InputProps={{ endAdornment: endAdornmentLatitude() }}
          value={geoCoordsInFields.latitude}
          onChange={(e) => {
            setErrorStateGeoCoordField(false);
            setGeoCoordsInFields((prevState) => {
              return { ...prevState, latitude: e.target.value };
            });
          }}
          inputRef={latitudeBox}
          fullWidth
          variant="outlined"
          label="Latitude (N/S)"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          error={errorStateGeoCoordField}
          onClick={() => setErrorStateGeoCoordField(false)}
          InputProps={{ endAdornment: endAdornmentLongitude() }}
          value={geoCoordsInFields.longitude}
          onChange={(e) => {
            setErrorStateGeoCoordField(false);
            setGeoCoordsInFields((prevState) => {
              return { ...prevState, longitude: e.target.value };
            });
          }}
          fullWidth
          variant="outlined"
          label="Longitude (E/W)"
        />
      </Grid>
    </Grid>
  );
}

export default GeoCoordSearchField;
