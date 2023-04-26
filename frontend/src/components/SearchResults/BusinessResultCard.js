import { Link } from "react-router-dom";
import "./BusinessResultCard.css";
import PresentStars from "./PresentStars";

const BusinessResultCard = ({ business, idx }) => {
  // if (!business) return null;
  // debugger;

  const addHoverShadow = (card) => {
    card.classList.remove("unhovered");
    card.classList.add("hovered");
  };

  const removeHoverShadow = (card) => {
    card.classList.remove("hovered");
    card.classList.add("unhovered");
  };

  return (
    <Link to={`/businesses/${business.id}`}>
      <div
        className="business-card-container unhovered"
        onMouseEnter={(e) => addHoverShadow(e.target)}
        onMouseLeave={(e) => removeHoverShadow(e.target)}
      >
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
