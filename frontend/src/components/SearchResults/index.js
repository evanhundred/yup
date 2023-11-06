import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getBusinesses, fetchBusinesses } from "../../store/businesses";
import { useSelector, useDispatch } from "react-redux";
import BusinessResultCard from "./BusinessResultCard";
// import webSpider from "../../assets/images/web-spider.jpg";

import "./index.css";

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const businesses = useSelector(getBusinesses);
  const message = useSelector((state) => state.message);
  const searchString = location.search.slice(1);

  // const [initiallyLoaded]

  const rootElement = document.getElementById("root");
  rootElement.scrollIntoView(true);

  console.log(location);

  const errorsExist = location.state && !!location.state.searchErrors;
  console.log(errorsExist);

  const loadBusinessesIfErrors = () => {
    if (errorsExist && !businesses.length) dispatch(fetchBusinesses());
  };

  useEffect(loadBusinessesIfErrors, [errorsExist, dispatch, businesses]);

  // if (errorsExist) {
  //   dispatch(fetchBusinesses());
  // }

  if (!businesses.length)
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );

  let promptString;
  if (location.search === "?write-review") {
    promptString = "Search for business to review.";
  } else {
    promptString = `All "${searchString}" results near New York, NY`;
  }

  if (message) {
    promptString = message.message;
  }
  // if (errorsExist) {
  //   promptString = `${location.state.searchErrors}`;
  // }

  const emptySearchString = "Here are some popular businesses:";
  const firstTenBusinesses = businesses.slice(0, 10);

  return (
    <div>
      <div id="search-results-container">
        <h2>{promptString}</h2>
        <h3 className="popular-businesses-prompt">
          {Object.keys(message).length > 0 && emptySearchString}
        </h3>
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

// const spiderComponent = () => (
//   <div className="search-errors-content">
//     <h1>{location.state.searchErrors}</h1>
//     <div className="web-spider-image">
//       <img src={webSpider} alt="spider in my web" />
//     </div>
//   </div>
// );

// if (location.state && location.state.searchErrors)
//   return (
//     <div id="search-results-errors">
//       <div className="search-errors-content">
//         <h1>{location.state.searchErrors}</h1>

//       </div>
//     </div>
//   );
