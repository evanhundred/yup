import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getBusinesses,
  fetchBusinesses,
  searchBusinesses
} from '../../store/businesses';
import { loadMessage, loadMessages, resetMessages } from '../../store/messages';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import BusinessResultCard from './BusinessResultCard';
import Loading from '../Loading';

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const businesses = useSelector(getBusinesses);
  const messages = useSelector((state) => state.messages);
  const searchString = location.search.slice(1);

  const [initiallyLoaded, setInitiallyLoaded] = useState(false);

  const rootElement = document.getElementById('root');
  rootElement.scrollIntoView(true);

  let promptString;
  if (location.search === '?write-review') {
    promptString = 'Search for business to review.';
  } else if (messages.searchErrors) {
    promptString = messages.searchErrors;
  } else if (searchString === 'new-search') {
    promptString = 'Businesses in New York, NY';
  } else {
    promptString = `All "${searchString}" results near New York, NY`;
  }

  useEffect(() => {
    if (!messages.loaded && businesses.length > 0) {
      dispatch(loadMessage({ loaded: true }));
    }
    if (
      !messages.loaded &&
      messages.from === 'nav-search-bar' &&
      messages.searchErrors &&
      !businesses.length
    ) {
      dispatch(fetchBusinesses());
      setInitiallyLoaded(true);
      dispatch(loadMessage({ loaded: true }));
    }
  }, [businesses, dispatch, messages, initiallyLoaded]);

  if (
    !initiallyLoaded &&
    messages.from !== 'nav-search-bar' &&
    businesses.length === 0
  ) {
    setInitiallyLoaded(true);
    let messageObject = { loaded: true };
    let errors;
    if (searchString === 'new-search') {
      dispatch(resetMessages()).then(() => dispatch(fetchBusinesses()));
      dispatch(loadMessages(messageObject));
    } else {
      dispatch(resetMessages())
        .then(() => dispatch(searchBusinesses(searchString)))
        .then((res) => {
          console.log(res);
          if (res && res.status === 404) {
            errors = { searchErrors: `404 - ${searchString} not fround` };
          } else if (!res.ok) {
            errors = {
              searchErrors: `${res.status}${
                res.statusText ? '' : ` - ${res.statusText}`
              }`
            };
          }
          dispatch(fetchBusinesses());
          if (!messages.searchErrors)
            messageObject = { ...messageObject, ...errors };
          dispatch(loadMessages(messageObject));
        });
    }
  }

  if (!businesses.length) return <Loading />;

  const emptySearchString = 'Here are some popular businesses:';
  const firstTenBusinesses = businesses.slice(0, 10);

  return (
    <div>
      <div id='search-results-container'>
        <h2>{promptString}</h2>
        <h3 className='popular-businesses-prompt'>
          {messages.loaded && !!messages.searchErrors && emptySearchString}
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
