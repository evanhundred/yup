const PhotoBlock = ({ business }) => {
  let defaultImages;
  if (business.stub === "true") {
    const importAll = (r) => {
      let images = {};
      r.keys().map((item) => {
        return (images[item.replace("./", "")] = r(item));
      });
      return images;
    };
    defaultImages = importAll(
      require.context("../../../assets/images/stub/", false, /\S/)
    );
  }

  const getImage = (idx) => {
    if (business.stub === "true") {
      return defaultImages[`${idx}.jpeg`];
    }
    return business.imageUrls[idx];
  };
  return (
    <div
      className={`business-image-container${
        business.stub === "true" ? " stub" : ""
      }`}
    >
      <div className="business-image one">
        <img src={getImage(0)} alt="delicious items" />
      </div>

      <div className="business-image two">
        <img src={getImage(4)} alt="fantastic store" />
      </div>

      <div className="business-image three">
        <img src={getImage(1)} alt="more delicious items" />
      </div>

      <div className="business-image four">
        <img src={getImage(2)} alt="more delicious deliciousness" />
      </div>
      <div className="business-image five">
        <img src={getImage(3)} alt="more more delicious deliciousness" />
      </div>
    </div>
  );
};

export default PhotoBlock;
