import "./index.css";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  console.log(location);
  return <div id="search-results-container">Search Results</div>;
};

export default SearchResults;
