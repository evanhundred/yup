import "./index.css";
import { useLocation } from "react-router-dom";
import { fetchBusinesses } from "../../store/businesses";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

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
  const searchString = location.search.slice(1);

  // need to split this search string at &
  const searchStringParts = searchString.split("&");

  // coffee&find_loc=new-york
  // ["coffee", "find_loc=new-york"]

  const categoryString = searchStringParts[0];
  const findLocString = searchStringParts[1];

  let categoryRegExp = new RegExp(categoryString);
  let findLocRegExp = new RegExp(findLocString);

  const matchingBusinesses = businesses.filter((business) =>
    business.category.toLowerCase().match(categoryRegExp)
  );

  // regExp works to search categories, or other keywords that can be searched
  // as text
  // location search is dual staged:
  // 1. determine type of search term
  // list of cities, states and nabes

  // source: https://github.com/grammakov/USA-cities-and-states
  // 60K + list of cities, sorted by:
  // City|State short name|State full name|County|City Alias Mixed Case

  //

  // ?category=coffee&find_loc=new-york
  // now this string has been reduced to the actual search terms

  return (
    <div id="search-results-container">
      <h2>{`All "${categoryString}" results in`}</h2>
      <ul>
        {matchingBusinesses.map((business) => {
          return <li key={business.name}>{business.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default SearchResults;
