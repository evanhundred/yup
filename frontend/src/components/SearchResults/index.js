import "./index.css";
import { useLocation } from "react-router-dom";
import { fetchBusinesses } from "../../store/businesses";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import csvFile from "../../assets/us_cities_states_counties.csv";
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

  // console.log(giganticString);
  let splitGiganticString;
  if (giganticString) {
    splitGiganticString = giganticString.split("\n");
  }
  // console.log(splitGiganticString);

  const usCitiesList = [];
  if (giganticString) {
    for (let i = 1; i < splitGiganticString.length; i++) {
      const newRow = splitGiganticString[i].split("|");
      usCitiesList.push(newRow);
    }
  }

  // console.log(usCitiesList.slice(0, 10));

  const location = useLocation();
  if (!location.search.includes("category"))
    return <div class="search-error">Incorrect seach terms.</div>;

  // searchString
  const searchString = location.search.slice(10);

  // need to split this search string at &
  const searchStringParts = searchString.split("&find_loc=");

  // ?category=coffee&find_loc=new-york
  // ["category=coffee", "find_loc=new-york"]

  const categoryString = searchStringParts[0];
  const findLocString = searchStringParts[1];

  let categoryRegExp = new RegExp(categoryString);

  // format findLocString on search:
  //  look for last three characters to match /^[]

  // let findLocRegExp = new RegExp(findLocString);
  // debugger;
  // search usCitiesList for match with findLocRegExp
  let matchedCity;
  let matchedState;
  if (giganticString) {
    for (let i = 0; !matchedCity && i < usCitiesList.length; i++) {
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
          matchedCity = usCitiesList[i][0];
          matchedState = usCitiesList[i][1];
          break;
        }
      }
    }
  }
  // debugger;
  // constole.log(findLoc"string)
  console.log(matchedCity ? matchedCity : "no match found");

  const matchedCityRegExp = new RegExp(matchedCity);
  const matchedStateRegExp = new RegExp(matchedState);

  const matchingCityBusinesses = businesses.filter((business) =>
    business.city.toLowerCase().match()
  );

  // http://localhost:3000/search?category=coffee&find_loc=new-york%2C+ny

  // const matchingBusinesses = businesses.filter(
  //   (business) =>
  //     business.category.toLowerCase().match(categoryRegExp) &&
  //     business.city.toLowerCase().match(findLocRegExp)
  // );
  const matchingCategoryBusinesses = businesses.filter((business) =>
    business.category.toLowerCase().match(categoryRegExp)
  );
  // split string into city and state

  // business findLoc RegExp

  // const matchingLocBusinesses = businesses.filter((business) => (

  // ));

  // regExp works to search categories, or other keywords that can be searched
  // as text
  // location search is dual staged:
  // 1. determine type of search term
  // list of cities, states and nabes

  // source: https://github.com/grammakov/USA-cities-and-states
  // 60K+ list of cities, sorted by:
  // City|State short name|State full name|County|City Alias Mixed Case
  // this can be searched to determine if the search term is a state or major
  //  city
  //  - if yes, determine city, state, or neighborhood from the 60k list
  //   at this stage of Yup's growth, business locations are limited to
  //   the NYC metro area
  // we need to determine an arbitrary geographical area to limit search results

  // Rather than go in this expansive direction, which anticipates a fully fleshed out map of business
  //  entities;
  // Choose a set amount of neighborhoods, so that you can only search for businesses in those areas.
  // this makes more sense with the scale of the project. we can have ten businesses per borough.
  // a challenge I want to process is statically created seed data, versus an automated way of gathering
  // entities from the internet or other sources of data.
  // creating seed data feels like a time suck. I have spent multiple hours generating data by hand, and it seems
  // like wasted time and energy.

  // one possible solution is to choose ten entities per boro, and limit all search functionality to
  // NYC. this is also what Welp creator Amanda Chen (https://github.com/amandac3600/Welp) chose to do,
  // and it seems sufficient.

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
          {matchingCategoryBusinesses.map((business) => {
            return <li key={business.name}>{business.name}</li>;
          })}
        </ul>
      </div>
      <div className="csv-dump">{splitGiganticString[1]}</div>
    </div>
  );
};

export default SearchResults;
