import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const DemoCarousel = () => {
  return (
    <Carousel>
      <div>
        <svg
          src="../../assets/icons/flags/4x3/ac.svg"
          alt="delicous carousel"
        />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <svg
          src="../../assets/icons/flags/4x3/ad.svg"
          alt="delicous carousel"
        />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <svg
          src="../../assets/icons/flags/4x3/ac.svg"
          alt="delicous carousel"
        />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default DemoCarousel;
