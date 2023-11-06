import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getBusinesses,
  fetchBusinesses,
  searchBusinesses
} from "../../store/businesses";
import { loadMessage, resetMessages } from "../../store/messages";
import { useSelector, useDispatch } from "react-redux";
import BusinessResultCard from "./BusinessResultCard";
// import webSpider from "../../assets/images/web-spider.jpg";

import "./index.css";

const SearchResults = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const businesses = useSelector(getBusinesses);
  const messages = useSelector((state) => state.messages);
  const searchString = location.search.slice(1);
  // const andIndex = searchString.indexOf("&from=");
  // const searchQuery = searchString.slice(0, andIndex);
  // const fromString = searchString.slice(andIndex);

  const [initiallyLoaded, setInitiallyLoaded] = useState(false);

  const rootElement = document.getElementById("root");
  rootElement.scrollIntoView(true);

  // console.log(location);
  // console.log(history);

  const errorsExist = location.state && !!location.state.searchErrors;
  // console.log(errorsExist);

  // if (errorsExist) {
  //   dispatch(fetchBusinesses());
  // }

  let promptString;
  if (location.search === "?write-review") {
    promptString = "Search for business to review.";
  } else if (messages.searchErrors) {
    promptString = messages.searchErrors;
  } else {
    promptString = `All "${searchString}" results near New York, NY`;
  }

  const fromSearchBar =
    location.state &&
    location.state.from &&
    location.state.from === "search-bar";
  const searchedFromSearch =
    location.state && location.state.from === "search-page";

  if (!initiallyLoaded && businesses.length === 0) {
    let errors;
    // location.state.from = "search-page";
    dispatch(searchBusinesses(searchString)).then((res) => {
      if (res && res.status === 404) {
        dispatch(resetMessages());
        // console.log(res)
        errors = { searchErrors: `404 - ${searchString} not found` };
        if (!messages.searchErrors) dispatch(loadMessage(errors));
        dispatch(fetchBusinesses);
        // console.log(errors);
      }
      setInitiallyLoaded(true);
    });
  }

  const loadBusinessesIfErrors = () => {
    if (
      (initiallyLoaded && messages.searchErrors && businesses.length === 0) ||
      (!initiallyLoaded &&
        businesses.length === 0 &&
        messages.from === "nav-search-bar")
    ) {
      dispatch(fetchBusinesses());
      if (!initiallyLoaded) setInitiallyLoaded(true);
    }
  };

  useEffect(loadBusinessesIfErrors, [
    dispatch,
    messages,
    businesses,
    initiallyLoaded
  ]);
  // if (message.message) {
  //   promptString = message.message;
  //   dispatch(fetchBusinesses());
  // }

  if (!businesses.length)
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );

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
          {Object.keys(messages).length > 0 && emptySearchString}
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
