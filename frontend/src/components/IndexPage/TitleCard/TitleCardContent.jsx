import SearchIcon from "../../../assets/images/search.png";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchBusinesses, clearBusinesses } from "../../../store/businesses";
import KeyFood from "../../../assets/images/stub/3.jpeg";
import Skyline from "../../../assets/restaurant-skyline.jpg";
import CoffeeShop from "../../../assets/devocion_bar.jpeg";

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
  // SecondLine: I have copied the variable name used by yelp.
  // is this plagiarism? is it acceptable ettiquete?

  // https://www.yelp.com/search?find_desc=coffee&find_loc=New+York%2C+NY+11226

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
    const handleCarouselDotClick = (dotIdx) => {
      const img = document.getElementById("photo-block-splash-image");
      switch (dotIdx) {
        case 1:
          img.src = CoffeeShop;
          break;
        case 2:
          img.src = KeyFood;
          break;
        case 3:
          img.src = Skyline;
          break;
        default:
          break;
      }
    };
    return (
      <div id="title-card-footer-container">
        <div className="title-card-footer">
          <h2>Devoción</h2>
        </div>
        <div className="carousel-dots">
          <h2>
            <span
              onClick={() => {
                handleCarouselDotClick(1);
              }}
            >
              ⚪️
            </span>
            <span
              onClick={() => {
                handleCarouselDotClick(2);
              }}
            >
              ⚪️
              {/* white circle
Unicode: U+26AA U+FE0F, UTF-8: E2 9A AA EF B8 8F */}
            </span>
            <span
              onClick={() => {
                handleCarouselDotClick(3);
              }}
            >
              ⚪️
            </span>
          </h2>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="business-title-card-container">
        <div className="main-content">
          <FirstLine />
          <SecondLine />
        </div>
        <div className="footer">
          <TitleCardFooter />
        </div>
      </div>
    </>
  );
};
export default TitleCardContent;
