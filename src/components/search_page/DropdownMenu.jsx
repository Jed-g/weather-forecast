import React from "react";
import { MenuItem, TextField } from "@material-ui/core";

function DropdownMenu({
  isSearchTypeCitySelected,
  setIsSearchTypeCitySelected,
}) {
  return (
    <TextField
      onChange={(e) =>
        setIsSearchTypeCitySelected(e.target.value === "City Name")
      }
      fullWidth
      value={isSearchTypeCitySelected ? "City Name" : "Geographic Coordinates"}
      variant="filled"
      select
      label="Search Type"
    >
      <MenuItem value="City Name">City Name</MenuItem>
      <MenuItem value="Geographic Coordinates">Geographic Coordinates</MenuItem>
    </TextField>
  );
}

export default DropdownMenu;
