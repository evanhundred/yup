import { useLocation } from "react-router-dom";
import { getBusinesses } from "../../store/businesses";
import { useSelector } from "react-redux";
import BusinessResultCard from "./BusinessResultCard";
import "./index.css";

const SearchResults = () => {
  const location = useLocation();
  const businesses = useSelector(getBusinesses);

  const searchString = location.search.slice(1);

  console.log(location);

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
