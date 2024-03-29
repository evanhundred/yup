import SearchIcon from "../../../assets/images/search.png";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchBusinesses, clearBusinesses } from "../../../store/businesses";

const TitleCardContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const FirstLine = () => {
    return (
      <>
        <h1>Mind-blowing coffee</h1>
      </>
    );
  };

  const SecondLine = () => {
    const handleSearchClick = (e, query) => {
      e.preventDefault();
      dispatch(clearBusinesses());
      dispatch(searchBusinesses(query)).then(() =>
        history.push(`/search?${query}`)
      );
    };
    const carouselQuery = "coffee";
    return (
      <div
        className="second-line search-button"
        onClick={(e) => handleSearchClick(e, carouselQuery)}
      >
        <img src={SearchIcon} alt="" />
        <h3>Coffee</h3>
      </div>
    );
  };
  const TitleCardFooter = () => {
    return (
      <div className="title-card-footer">
        <h2>Devoción</h2>
      </div>
    );
  };

  return (
    <>
      <div className="business-title-card">
        <FirstLine />
        <SecondLine />
        <TitleCardFooter />
      </div>
    </>
  );
};
export default TitleCardContent;
