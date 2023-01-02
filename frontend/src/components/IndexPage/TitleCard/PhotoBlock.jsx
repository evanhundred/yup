import StockPhoto from "../../../assets/restaurant-skyline.jpg";

const PhotoBlock = ({ business }) => {
  return (
    <div className="image-height-reset">
      <div className="image-container">
        <img src={StockPhoto} alt="outdoor dining" />
      </div>
    </div>
  );
};

export default PhotoBlock;
