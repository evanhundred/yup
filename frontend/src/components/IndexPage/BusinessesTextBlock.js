// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { getBusinesses, fetchBusinesses } from "../../store/businesses";
import "./IndexPage.css";

const BusinessesTextBlock = ({ businesses }) => {
  const businessBlock = businesses.map((business, idx) => {
    if (!businesses) return null;

    return (
      <div className="business-card" key={idx}>
        <div className="card-image">
          <Link to={`/businesses/${business.id}`}>
            <img src={business.imageUrls[1]} alt="delicious business" />
          </Link>
        </div>

        <div className="info-section">
          <h3>{business.name}</h3>
        </div>
      </div>
    );
  });

  return <div id="business-block">{businesses ? businessBlock : ""}</div>;
};

export default BusinessesTextBlock;
