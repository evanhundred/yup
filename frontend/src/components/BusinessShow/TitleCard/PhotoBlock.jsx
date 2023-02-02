const PhotoBlock = ({ business }) => {
  return (
    <div className="business-image-container">
      <div className="business-image one">
        <img src={business.imageUrls[0]} alt="delicious items" />
      </div>
      <div className="business-image two">
        <img src={business.imageUrls[3]} alt="fantastic store" />
      </div>
      <div className="business-image three">
        <img src={business.imageUrls[1]} alt="more delicious items" />
      </div>
      <div className="business-image four">
        <img src={business.imageUrls[2]} alt="more delicious deliciousness" />
      </div>
      <div className="business-image five">
        <img
          src={business.imageUrls[4]}
          alt="more more delicious deliciousness"
        />
      </div>
    </div>
  );
};

export default PhotoBlock;
