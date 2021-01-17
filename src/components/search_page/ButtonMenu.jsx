import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";

function ButtonMenu({
  isSearchTypeCitySelected,
  updateIsSearchTypeCitySelected,
}) {
  return (
    <ButtonGroup fullWidth>
      <Button
        disableElevation
        onClick={() => updateIsSearchTypeCitySelected(true)}
        variant={isSearchTypeCitySelected ? "contained" : "outlined"}
      >
        City Name
      </Button>
      <Button
        disableElevation
        onClick={() => updateIsSearchTypeCitySelected(false)}
        variant={!isSearchTypeCitySelected ? "contained" : "outlined"}
      >
        Geographic Coordinates
      </Button>
    </ButtonGroup>
  );
}

export default ButtonMenu;
