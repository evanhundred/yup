import SectionHeader from "./SectionHeader";
import BusinessesGrid from "./BusinessesGrid";

import { useHistory } from "react-router-dom";

const MainContent = ({ businesses }) => {
  const history = useHistory();
  const loadMoreOrSearch = () => {
    const handleLoadMoreClick = () => {};
    const handleSearchClick = () => {
      const searchState = { search: "new" };
      history.push(`/search?new-search`, searchState);
    };
    return (
      <div className="post-biz-grid-container">
        <h3 onClick={handleLoadMoreClick}>Load More</h3>
        <h3 onClick={handleSearchClick}>Search for More</h3>
      </div>
    );
  };
  return (
    <div className="business-block-container">
      <SectionHeader title={{ text: "Wonderful Restaurants" }} />
      <BusinessesGrid businesses={businesses} />
      {loadMoreOrSearch()}
    </div>
  );
};

export default MainContent;
