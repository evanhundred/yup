import "./index.css";
import { useLocation } from "react-router-dom";
import { fetchBusinesses } from "../../store/businesses";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import csvFile from "../../assets/us_cities_states_counties.csv";
import { getStatesArray } from "./FormatSearchQuery";

// THIS WORKS (outside component definition):
let giganticString;
// when declared within SearchResults, the empty declaration leads to the variable evaluating to `undefined` when the code hits return;

const SearchResults = () => {
  const dispatch = useDispatch();
  const businesses = useSelector((state) => Object.values(state.businesses));

  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch]);

  fetch(csvFile)
    .then((response) => response.text())
    .then((text) => (giganticString = text));

  let splitGiganticString;
  if (giganticString) {
    splitGiganticString = giganticString.split("\n");
  }

  const statesArray = getStatesArray();
  console.log(statesArray);

  const usCitiesList = [];
  if (giganticString) {
    for (let i = 1; i < splitGiganticString.length; i++) {
      const newRow = splitGiganticString[i].split("|");
      usCitiesList.push(newRow);
    }
  }

  const location = useLocation();
  if (!location.search.includes("category"))
    return <div class="search-error">Incorrect seach terms.</div>;

  const searchString = location.search.slice(10);
  const searchStringParts = searchString.split("&find_loc=");

  // ?category=coffee&find_loc=new-york%2C+ny
  // ["category=coffee", "find_loc=new-york%2C+ny"]

  const categoryString = searchStringParts[0];
  const findLocString = searchStringParts[1];

  const findLocArray = findLocString.split("&2C+");
  const cityString = findLocArray[0];
  const stateString = findLocArray[1];

  let categoryRegExp = new RegExp(categoryString);

  // format findLocString on search:
  //  look for last three characters to match /^[]

  // let findLocRegExp = new RegExp(findLocString);
  // search usCitiesList for match with findLocRegExp

  let matchedCity;
  let matchedState;

  if (giganticString && findLocString) {
    for (let i = 0; !matchedCity && i < usCitiesList.length; i++) {
      const currentCityRegExp = new RegExp(
        usCitiesList[i][0].toLowerCase().split(" ").join("-")
      );

      // if (findLocString.match(currentCityRegExp)) {
      // }

      if (findLocString)
        for (let j = 0; j < usCitiesList[i].length; j++) {
          if (j === 1) j = 3;
          // assume that search string is formatted correctly
          // formatting should separate all words by dash
          // entire city name must be matched in search string
          const currentEntryString = usCitiesList[i][j]
            .toLowerCase()
            .split(" ")
            .join("-");

          const currentEntryRegExp = new RegExp(currentEntryString);

          if (findLocString.match(currentEntryRegExp)) {
            const currentState = usCitiesList[i][1];
            const currentStateRegExp = new RegExp(currentState.toLowerCase());

            if (stateString.match(currentStateRegExp)) {
              matchedState = currentState;
              matchedCity = usCitiesList[i][0];
              break;
            }
          }
        }
    }
  }

  // TODO 4/12: complete matchedCity, State logic

  console.log(matchedCity ? matchedCity : "no match found");

  const matchedCityRegExp = new RegExp(matchedCity);
  const matchedStateRegExp = new RegExp(matchedState);

  const matchingBusinesses = businesses.filter(
    (business) =>
      business.state.toLowerCase().match(matchedStateRegExp) &&
      business.city.toLowerCase().match(matchedCityRegExp) &&
      business.category.toLowerCase().match(categoryRegExp)
  );

  // http://localhost:3000/search?category=coffee&find_loc=new-york%2C+ny

  if (
    !businesses.length ||
    !giganticString ||
    typeof giganticString !== "string"
  )
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );

  return (
    <div>
      <div id="search-results-container">
        <h2>{`All ${categoryString} results near ${findLocString}`}</h2>
        <ul>
          {matchingBusinesses.map((business) => {
            return <li key={business.name}>{business.name}</li>;
          })}
        </ul>
      </div>
      <div className="csv-dump">{splitGiganticString[1]}</div>
    </div>
  );
};

export default SearchResults;
