import PhotoBlock from "./PhotoBlock";
import TitleCardContent from "./TitleCardContent";

const TitleCard = ({ businesses }) => {
  const randomNum = Math.floor(Math.random() * businesses.length);
  const business = businesses ? businesses[randomNum] : {};

  return (
    <>
      <PhotoBlock business={business} />
      <TitleCardContent business={business} />
    </>
  );
};

export default TitleCard;
