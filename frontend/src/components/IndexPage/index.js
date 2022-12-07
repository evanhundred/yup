import "./IndexPage.css";

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
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
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
    </>
  );
};

export default IndexPage;
