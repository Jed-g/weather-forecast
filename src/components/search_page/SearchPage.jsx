import React, { useReducer, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Box,
  Typography,
  Hidden,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CitySearchField from "./CitySearchField";
import GeoCoordSearchField from "./GeoCoordSearchField";
import DropdownMenu from "./DropdownMenu";
import ButtonMenu from "./ButtonMenu";
import ExploreIcon from "@material-ui/icons/Explore";
import SearchImage from "./search_image.jpg";

function changeIsSearchTypeCitySelected(state, wasSearchTypeCitySelected) {
  if (state !== wasSearchTypeCitySelected) {
    return wasSearchTypeCitySelected;
  }
  return state;
}

function SearchPage({ CITY_LIST }) {
  const [isSearchTypeCitySelected, updateIsSearchTypeCitySelected] = useReducer(
    changeIsSearchTypeCitySelected,
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

  const [listOfSuggestions, setListOfSuggestions] = useState([]);
  const listOfSuggestionsPersist = useRef(listOfSuggestions);
  listOfSuggestionsPersist.current = listOfSuggestions;

  const linkButtonRef = useRef();
  const errorButtonRef = useRef();

  const [errorStateCityNameField, setErrorStateCityNameField] = useState(false);

  useEffect(() => {
    const eventListenerFunction = function (e) {
      document.removeEventListener("keydown", eventListenerFunction);
      if (e.key === "Enter") {
        if (listOfSuggestionsPersist.current.length === 0) {
          errorButtonRef.current && errorButtonRef.current.click();
        } else {
          linkButtonRef.current && linkButtonRef.current.click();
        }
      }
    };
    document.addEventListener("keydown", eventListenerFunction);

    document.addEventListener("keyup", () => {
      document.addEventListener("keydown", eventListenerFunction);
    });
  }, []);

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
                    />
                  ) : (
                    <GeoCoordSearchField />
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
                {listOfSuggestions.length !== 0 && (
                  <Link
                    ref={linkButtonRef}
                    to={`/${listOfSuggestions[0].city.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      fullWidth
                      startIcon={<ExploreIcon />}
                      color="primary"
                      variant="contained"
                    >
                      Search
                    </Button>
                  </Link>
                )}
                {listOfSuggestions.length === 0 && (
                  <Button
                    ref={errorButtonRef}
                    fullWidth
                    startIcon={<ExploreIcon />}
                    color="primary"
                    variant="contained"
                    onClick={() => setErrorStateCityNameField(true)}
                  >
                    Search
                  </Button>
                )}
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
