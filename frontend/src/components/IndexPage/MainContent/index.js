import SectionHeader from './SectionHeader';
import BusinessesGrid from './BusinessesGrid';

import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const MainContent = () => {
  const history = useHistory();

  const [businessesToLoad, setBusinessesToLoad] = useState(6);

  const loadMoreOrSearch = () => {
    const handleLoadMoreClick = () => {
      setBusinessesToLoad(businessesToLoad + 1);
    };

    const handleSearchClick = () => {
      const searchState = { search: 'new' };
      history.push(`/search?new-search`, searchState);
    };

    return (
      <div className='post-biz-grid-container'>
        <h3 onClick={handleLoadMoreClick}>Load More</h3>
        <h3 onClick={handleSearchClick}>Search for More</h3>
      </div>
    );
  };

  return (
    <div className='business-block-container'>
      <SectionHeader title={{ text: 'Featured Businesses' }} />
      <BusinessesGrid businessesToLoad={businessesToLoad} />
      {loadMoreOrSearch()}
    </div>
  );
};

export default MainContent;
