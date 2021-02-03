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
    <div style={{ display: "flex", flexDirection: "column", width: 125 }}>
      <Typography className={classes.parameterName}>{parameterName}</Typography>
      <Typography className={classes.parameterValue} variant="h5" component="p">
        {parameterValue}
      </Typography>
    </div>
  );
}

export default DetailBox;
