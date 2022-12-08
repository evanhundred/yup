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

const ActivityFeed = () => {
  return (
    <div className="activity-feed-container">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
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
      <SectionHeader title={{ text: "Recent Activity" }} />
      <BusinessesTextBlock />
    </>
  );
};

export default IndexPage;
