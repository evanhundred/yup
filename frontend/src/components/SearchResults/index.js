import { useLocation } from "react-router-dom";
import { getBusinesses } from "../../store/businesses";
import { useSelector } from "react-redux";
import BusinessResultCard from "./BusinessResultCard";
import webSpider from "../../assets/images/web-spider.jpg";

import "./index.css";

const SearchResults = () => {
  const location = useLocation();
  const businesses = useSelector(getBusinesses);
  const searchString = location.search.slice(1);

  console.log(location);

  if (location.state && location.state.searchErrors)
    return (
      <div id="search-results-errors">
        <div className="search-errors-content">
          <h1>{location.state.searchErrors}</h1>
          <div className="web-spider-image">
            <img src={webSpider} alt="spider in my web" />
          </div>
        </div>
      </div>
    );

  if (!businesses.length)
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );

  const firstTenBusinesses = businesses.slice(0, 10);

  return (
    <div>
      <div id="search-results-container">
        <h2>{`All "${searchString}" results near New York, NY`}</h2>
        <ul>
          {firstTenBusinesses.map((business, idx) => {
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
