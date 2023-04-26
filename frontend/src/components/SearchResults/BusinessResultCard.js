import { Link } from "react-router-dom";
import "./BusinessResultCard.css";
import PresentStars from "./PresentStars";

const BusinessResultCard = ({ business, idx }) => {
  // if (!business) return null;
  // debugger;
  return (
    <Link to={`/businesses/${business.id}`}>
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
    </Link>
  );
};

export default BusinessResultCard;
