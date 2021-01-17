import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Box,
  Typography,
  Hidden,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CitySearchField from "./CitySearchField";
import GeoCoordSearchField from "./GeoCoordSearchField";
import DropdownMenu from "./DropdownMenu";
import ButtonMenu from "./ButtonMenu";
import SearchImage from "./search_image.jpg";
import SearchButton from "./SearchButton";

function SearchPage({ API_KEY, CITY_LIST }) {
  const [isSearchTypeCitySelected, updateIsSearchTypeCitySelected] = useState(
    true
  );

  const title = (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Typography variant="h5" component="h3">
        Weather Forecast
      </Typography>
      <SearchIcon style={{ fontSize: 28, marginLeft: 8 }} />
    </Box>
  );

  const [cityNameInField, setCityNameInField] = useState("");
  const [listOfSuggestions, setListOfSuggestions] = useState([]);
  const [
    suggestionCurrentlySelected,
    setSuggestionCurrentlySelected,
  ] = useState(0);
  const executingAutocompleteLookup = useRef(false);

  const [geoCoordsInFields, setGeoCoordsInFields] = useState({
    latitude: "",
    longitude: "",
  });

  const [errorStateCityNameField, setErrorStateCityNameField] = useState(false);
  const [errorStateGeoCoordField, setErrorStateGeoCoordField] = useState(false);

  return (
    <Grid container>
      <Grid item xs={1} sm={3} md={4}></Grid>
      <Grid item xs={10} sm={6} md={4}>
        <Card raised>
          <CardMedia
            height={200}
            image={SearchImage}
            component="img"
            alt="Nature Image"
          />
          <CardHeader disableTypography title={title} />
          <form autoComplete="off" spellCheck="false">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {isSearchTypeCitySelected ? (
                    <CitySearchField
                      errorStateCityNameField={errorStateCityNameField}
                      setErrorStateCityNameField={setErrorStateCityNameField}
                      CITY_LIST={CITY_LIST}
                      listOfSuggestions={listOfSuggestions}
                      setListOfSuggestions={setListOfSuggestions}
                      cityNameInField={cityNameInField}
                      setCityNameInField={setCityNameInField}
                      executingAutocompleteLookup={executingAutocompleteLookup}
                      suggestionCurrentlySelected={suggestionCurrentlySelected}
                      setSuggestionCurrentlySelected={
                        setSuggestionCurrentlySelected
                      }
                    />
                  ) : (
                    <GeoCoordSearchField
                      geoCoordsInFields={geoCoordsInFields}
                      setGeoCoordsInFields={setGeoCoordsInFields}
                      errorStateGeoCoordField={errorStateGeoCoordField}
                      setErrorStateGeoCoordField={setErrorStateGeoCoordField}
                    />
                  )}
                </Grid>
                <Hidden xsDown>
                  <Grid item xs={12}>
                    <ButtonMenu
                      isSearchTypeCitySelected={isSearchTypeCitySelected}
                      updateIsSearchTypeCitySelected={
                        updateIsSearchTypeCitySelected
                      }
                    />
                  </Grid>
                </Hidden>
                <Hidden smUp>
                  <Grid item xs={12}>
                    <DropdownMenu
                      isSearchTypeCitySelected={isSearchTypeCitySelected}
                      updateIsSearchTypeCitySelected={
                        updateIsSearchTypeCitySelected
                      }
                    />
                  </Grid>
                </Hidden>
              </Grid>
              <Grid item xs={12} md={4} lg={3} style={{ marginTop: 16 }}>
                <SearchButton
                  isSearchTypeCitySelected={isSearchTypeCitySelected}
                  listOfSuggestions={listOfSuggestions}
                  setErrorStateCityNameField={setErrorStateCityNameField}
                  setErrorStateGeoCoordField={setErrorStateGeoCoordField}
                  geoCoordsInFields={geoCoordsInFields}
                  executingAutocompleteLookup={executingAutocompleteLookup}
                  API_KEY={API_KEY}
                  suggestionCurrentlySelected={suggestionCurrentlySelected}
                />
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>
      <Grid item xs={1} sm={3} md={4}></Grid>
    </Grid>
  );
}

export default SearchPage;
