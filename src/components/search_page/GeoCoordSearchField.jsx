import React, { useEffect, useRef, useState } from "react";
import { Grid, TextField, InputAdornment, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

function GeoCoordSearchField() {
  const latitudeBox = useRef();
  useEffect(() => latitudeBox.current.focus(), []);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const endAdornmentLatitude = () => {
    if (latitude) {
      return (
        <InputAdornment position="end">
          <IconButton
            onClick={() => {
              setLatitude("");
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

  const endAdornmentLongitude = () => {
    if (longitude) {
      return (
        <InputAdornment position="end">
          <IconButton
            onClick={() => {
              setLongitude("");
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

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={6}>
        <TextField
          InputProps={{ endAdornment: endAdornmentLatitude() }}
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          inputRef={latitudeBox}
          fullWidth
          variant="outlined"
          label="Latitude"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          InputProps={{ endAdornment: endAdornmentLongitude() }}
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          fullWidth
          variant="outlined"
          label="Longitude"
        />
      </Grid>
    </Grid>
  );
}

export default GeoCoordSearchField;
