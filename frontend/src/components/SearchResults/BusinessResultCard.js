import "./BusinessResultCard.css";

const BusinessResultCard = ({ business }) => {
  // if (!business) return null;
  return (
    <div className="business-card-container">
      <div className="business-photo-container">
        <img src={business.imageUrls[5]} alt="delicious item" />
      </div>
      <div className="business-info">
        <p>{business.name}</p>
      </div>
    </div>
  );
};

export default BusinessResultCard;
