import CoffeeShop from "../../../assets/devocion_bar.jpeg";

const PhotoBlock = () => {
  return (
    <>
      <div className="image-height-reset" />
      <div className="image-container">
        <img
          id="photo-block-splash-image"
          src={CoffeeShop}
          alt="espresso bar at Devoción café"
        />
      </div>
    </>
  );
};

export default PhotoBlock;
