import React, { useState, useRef, lazy, Suspense } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
  Typography,
  Hidden,
  CircularProgress,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import GeoCoordSearchField from "./GeoCoordSearchField";
import DropdownMenu from "./DropdownMenu";
import ButtonMenu from "./ButtonMenu";
import SearchButton from "./SearchButton";
import SearchImage from "./SearchImage";

const CitySearchField = lazy(() => import("./CitySearchField"));

function SearchPage() {
  const [isSearchTypeCitySelected, setIsSearchTypeCitySelected] = useState(
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
    <Grid container style={{ margin: "40px 0" }}>
      <Grid item xs={1} sm={3} md={4}></Grid>
      <Grid item xs={10} sm={6} md={4}>
        <Card raised>
          <SearchImage />
          <CardHeader disableTypography title={title} />
          <form autoComplete="off" spellCheck="false">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {isSearchTypeCitySelected ? (
                    <Suspense
                      fallback={
                        <div
                          style={{
                            width: "100%",
                            height: "56px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <CircularProgress disableShrink />
                          <Typography style={{ marginLeft: "12px" }}>
                            Loading City Data...
                          </Typography>
                        </div>
                      }
                    >
                      <CitySearchField
                        errorStateCityNameField={errorStateCityNameField}
                        setErrorStateCityNameField={setErrorStateCityNameField}
                        listOfSuggestions={listOfSuggestions}
                        setListOfSuggestions={setListOfSuggestions}
                        cityNameInField={cityNameInField}
                        setCityNameInField={setCityNameInField}
                        executingAutocompleteLookup={
                          executingAutocompleteLookup
                        }
                        suggestionCurrentlySelected={
                          suggestionCurrentlySelected
                        }
                        setSuggestionCurrentlySelected={
                          setSuggestionCurrentlySelected
                        }
                      />
                    </Suspense>
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
                      setIsSearchTypeCitySelected={setIsSearchTypeCitySelected}
                    />
                  </Grid>
                </Hidden>
                <Hidden smUp>
                  <Grid item xs={12}>
                    <DropdownMenu
                      isSearchTypeCitySelected={isSearchTypeCitySelected}
                      setIsSearchTypeCitySelected={setIsSearchTypeCitySelected}
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
