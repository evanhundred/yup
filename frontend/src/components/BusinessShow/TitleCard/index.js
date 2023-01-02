import TitleCardContent from "./TitleCardContent";
import PhotoBlock from "./PhotoBlock";

const TitleCard = ({ business = null }) => {
  return (
    <>
      <PhotoBlock business={business} />
      <TitleCardContent business={business} />
    </>
  );
};

export default TitleCard;
