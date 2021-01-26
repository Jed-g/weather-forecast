import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";

function ButtonMenu({ isSearchTypeCitySelected, setIsSearchTypeCitySelected }) {
  return (
    <ButtonGroup fullWidth>
      <Button
        disableElevation
        onClick={() => setIsSearchTypeCitySelected(true)}
        variant={isSearchTypeCitySelected ? "contained" : "outlined"}
      >
        City Name
      </Button>
      <Button
        disableElevation
        onClick={() => setIsSearchTypeCitySelected(false)}
        variant={!isSearchTypeCitySelected ? "contained" : "outlined"}
      >
        Geographic Coordinates
      </Button>
    </ButtonGroup>
  );
}

export default ButtonMenu;
