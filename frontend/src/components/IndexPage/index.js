import "./IndexPage.css";
import BusinessesTextBlock from "./BusinessesTextBlock";

const SectionHeader = ({ title }) => {
  const textContent = title.text;
  return (
    <div className="section-header">
      <h2>{textContent}</h2>
    </div>
  );
};

const IndexPage = () => {
  return (
    <>
      <div className="image-height-reset">
        <div className="image-container">
          <img src={require("../../assets/restaurant-skyline.jpg")} />
        </div>
      </div>
      <div className="business-block-container">
        <SectionHeader title={{ text: "Wonderful Restaurants" }} />
        <BusinessesTextBlock />
      </div>
    </>
  );
};

export default IndexPage;
