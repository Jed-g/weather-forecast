import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  parameterName: {
    color: theme.palette.text.secondary,
  },
  parameterValue: {
    color: theme.palette.text.primary,
  },
}));

function DetailBox({ parameterName, parameterValue }) {
  const classes = useStyles();

  return (
    <div
      style={{
        minWidth: 125,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: 125 }}>
        <Typography className={classes.parameterName}>
          {parameterName}
        </Typography>
        <Typography className={classes.parameterValue} variant="h5">
          {parameterValue}
        </Typography>
      </div>
    </div>
  );
}

export default DetailBox;
