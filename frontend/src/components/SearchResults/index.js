import "./index.css";
import { useLocation } from "react-router-dom";
import { fetchBusinesses } from "../../store/businesses";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import Papa from "papaparse";
import csvFile from "../../assets/us_cities_states_counties.csv";

let giganticString;
fetch(csvFile)
  .then((response) => response.text())
  .then((text) => (giganticString = text));

// iterate through all businesses, check category for match with search string

// 1. category or title
// 2. location / neighborhood - optional
//  if neighborhood does not match up with any businesses, show all matching businesses
//  if neighborhood matches, show the associated businesses first,
//  then other businesses in nearby neighborhoods
// keep it simple: show all category / name matching businesses that match neighborhood. else,

// to do this properly, i should take the neighborhood or any location parameters,
// and run a true location based search

// simple solution: show businesses matching neighborhood, then a divider line, then all other businesses that match category string
//  if no neighborhood match is found, display 'no results found / other matches' and show other businesses matching category

// need to load all businesses into state

// 02/27

// need to add neighborhood (location) to component call

const SearchResults = () => {
  const dispatch = useDispatch();
  const businesses = useSelector((state) => Object.values(state.businesses));

  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch]);

  // const file = require("../../assets/us_cities_states_counties.csv");
  // const textFromFile = this.readTextFile(file);
  // console.log(textFromFile);

  // useEffect(() => {
  //   fetch("../../assets/us_cities_states_counties.csv")
  //     .then((response) => response.text())
  //     .then((text) => {
  //       console.log(text);
  //     });
  // });

  // let giganticString;
  // useEffect(() => {
  //   fetch("/src/assets/us_cities_states_counties.csv")
  //     .then((response) => response.text())
  //     .then((text) => (giganticString = text));
  // }, []);

  // const showFile = async (e) => {
  //   e.preventDefault();
  //   const reader = new FileReader();
  //   reader.onload = async (e) => {
  //     const text = e.target.result;
  //     console.log(text);
  //     alert(text);
  //   };
  //   reader.readAsText(e.target.files[0]);
  // };

  // useEffect(
  //   () => async () => {
  //     const response = await fetch(
  //       "../../assets/us_cities_states_counties.csv"
  //     );
  //     const reader = response.body.getReader();
  //     const result = await reader.read();
  //     const decoder = new TextDecoder("utf-8");
  //   },
  //   []
  // );

  // const [rows, setRows] = useState([]);

  const location = useLocation();
  if (!location.search.includes("category"))
    return <div class="search-error">Incorrect seach terms.</div>;

  if (!businesses.length)
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );

  // searchString
  const searchString = location.search.slice(10);

  // need to split this search string at &
  const searchStringParts = searchString.split("&find_loc=");

  // coffee&find_loc=new-york
  // ["category=coffee", "find_loc=new-york"]

  const categoryString = searchStringParts[0];
  const findLocString = searchStringParts[1];

  let categoryRegExp = new RegExp(categoryString);
  let findLocRegExp = new RegExp(findLocString);

  const matchingBusinesses = businesses.filter(
    (business) =>
      business.category.toLowerCase().match(categoryRegExp) &&
      business.city.toLowerCase().match(findLocRegExp)
  );

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

  //

  //

  // ?category=coffee&find_loc=new-york
  // now this string has been reduced to the actual search terms

  const formattedFindLocString = findLocString;

  // const changeHandler = (event) => {
  //   Papa.parse(event.target.files[0], {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete: function(results) {
  //       console.log(results.data);
  //     }
  //   });
  // };

  // const mainCsvFile = require("../../assets/us_cities_states_counties.csv");
  // fetch(mainCsvFile)
  //   .then((response) => response.text())
  //   .then((text) => this.setState({ text }));
  // console.log(csvFile);

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
      <div className="csv-dump">{giganticString}</div>
    </div>
  );
};

export default SearchResults;
