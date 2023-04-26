import "./BusinessResultCard.css";
import PresentStars from "./PresentStars";

const BusinessResultCard = ({ business, idx }) => {
  // if (!business) return null;
  debugger;
  return (
    <div className="business-card-container">
      <div className="business-photo-container">
        <img src={business.imageUrls[5]} alt="delicious item" />
      </div>
      <div className="business-info">
        <div className="business-title">
          <p>
            {idx}. {business.name}
          </p>
        </div>
        <div className="star-rating">
          <PresentStars business={business} />
        </div>
      </div>
    </div>
  );
};

export default BusinessResultCard;
