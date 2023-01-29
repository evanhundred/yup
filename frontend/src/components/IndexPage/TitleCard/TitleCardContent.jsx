import SearchIcon from "../../../assets/images/search.png";
import { Link } from "react-router-dom";

const TitleCardContent = ({ business }) => {
  const FirstLine = () => {
    return (
      <>
        <h1>Mind-blowing coffee</h1>
      </>
    );
  };
  const SecondLine = () => {
    return (
      <Link to="/businesses/search?category=coffee">
        <div className="second-line">
          <img src={SearchIcon} alt="" />
          <h3>Coffee</h3>
        </div>
      </Link>
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
