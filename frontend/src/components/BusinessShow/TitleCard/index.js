import TitleCardContent from "./TitleCardContent";
import PhotoBlock from "./PhotoBlock";

const TitleCard = ({ business = null }) => {
  return (
    <div className="title-card-container">
      <TitleCardContent business={business} />
      <PhotoBlock business={business} />
    </div>
  );
};

export default TitleCard;
