import React from "react";
import { Button, ButtonGroup, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  outlined: theme.palette.type === "light" && {
    "&:hover": {
      backgroundColor: "#EEEEEE",
    },
  },
  contained: theme.palette.type === "light" && {
    backgroundColor: "#BDBDBD",
  },
}));

function ButtonMenu({ isSearchTypeCitySelected, setIsSearchTypeCitySelected }) {
  const classes = useStyles();

  return (
    <ButtonGroup fullWidth>
      <Button
        disableElevation
        classes={{ outlined: classes.outlined, contained: classes.contained }}
        onClick={() => setIsSearchTypeCitySelected(true)}
        variant={isSearchTypeCitySelected ? "contained" : "outlined"}
      >
        City Name
      </Button>
      <Button
        disableElevation
        classes={{ outlined: classes.outlined, contained: classes.contained }}
        onClick={() => setIsSearchTypeCitySelected(false)}
        variant={!isSearchTypeCitySelected ? "contained" : "outlined"}
      >
        Geographic Coordinates
      </Button>
    </ButtonGroup>
  );
}

export default ButtonMenu;
