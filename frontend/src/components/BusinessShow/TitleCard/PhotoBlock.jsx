import defaultImage from "../../../assets/images/stub/1.jpeg";

const PhotoBlock = ({ business }) => {
  let images;
  if (business.stub === "true") {
    const importAll = (r) => {
      let images = {};
      r.keys().map((item) => {
        return (images[item.replace("./", "")] = r(item));
      });
      return images;
    };
    images = importAll(
      require.context("../../../assets/images/stub/", false, /\S/)
    );
  }
  const defaultImages = [];
  const getImage = (idx) => {
    if (business.stub === "true") {
      return defaultImages[idx];
    }
    return business.imageUrls[idx];
  };
  if (business.stub === "true") {
    return (
      <div className="business-image-container stub">
        <div className="default-image">
          <img src={defaultImage} alt={"delicious store"} />
        </div>
      </div>
    );
  }
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
