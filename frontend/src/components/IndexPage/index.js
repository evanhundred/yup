import "./IndexPage.css";

const SectionHeader = () => {
  return (
    <div className="section-header recent-activity">
      <h2>Recent Activity</h2>
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
      <SectionHeader />
    </>
  );
};

export default IndexPage;
