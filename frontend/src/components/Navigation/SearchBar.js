import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchBusinesses, clearBusinesses } from "../../store/businesses";
import SearchIcon from "../../assets/images/search.png";

const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const handleSearchBarClick = (e) => {
    e.preventDefault();
    dispatch(clearBusinesses());
    dispatch(searchBusinesses(query)).then(() =>
      history.push(`/search?${query}`)
    );
  };
  return (
    <form onSubmit={(e) => handleSearchBarClick(e)}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <input value="New York, NY" readOnly={true} />
      <button>
        {/* <button onClick={(e) => handleSearchBarClick(e)}> */}
        <img src={SearchIcon} alt="find businesses" />
      </button>
    </form>
  );
};

export default SearchBar;
