import SectionHeader from "./SectionHeader";
import BusinessesGrid from "./BusinessesGrid";

const MainContent = ({ businesses }) => {
  return (
    <div className="business-block-container">
      <SectionHeader title={{ text: "Wonderful Restaurants" }} />
      <BusinessesGrid businesses={businesses} />
    </div>
  );
};

export default MainContent;
