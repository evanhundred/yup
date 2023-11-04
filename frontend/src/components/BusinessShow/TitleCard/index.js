import TitleCardContent from "./TitleCardContent";
import PhotoBlock from "./PhotoBlock";

const TitleCard = ({ currentUser, business = null }) => {
  return (
    <div className="title-card-container">
      <TitleCardContent business={business} currentUser={currentUser} />
      <PhotoBlock business={business} />
    </div>
  );
};

export default TitleCard;
