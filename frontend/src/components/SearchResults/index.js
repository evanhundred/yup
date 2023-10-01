import "./index.css";
import { useLocation } from "react-router-dom";
import { getBusinesses, clearBusinesses } from "../../store/businesses";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import csvFile from "../../assets/us_cities_states_counties.csv";
import { getStatesArray } from "./FormatSearchQuery";
import BusinessResultCard from "./BusinessResultCard";

// THIS WORKS (outside component definition):
// let giganticString;X
// when declared within SearchResults, the empty declaration leads to the variable evaluating to `undefined` when the code hits return;

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const businesses = useSelector(getBusinesses);
  console.log(location);

  // useEffect(() => {
  //   dispatch(clearBusinesses());
  // }, [dispatch]);

  const searchString = location.search.slice(1);

  if (!businesses.length)
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );

  return (
    <div>
      <div id="search-results-container">
        <h2>{`All "${searchString}" results near New York, NY`}</h2>
        {/* // <h2>{`All "${categoryString}" results near ${formattedLocString}`}</h2> */}
        <ul>
          {businesses.map((business, idx) => {
            return (
              <li key={business.name}>
                <BusinessResultCard business={business} idx={idx} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
