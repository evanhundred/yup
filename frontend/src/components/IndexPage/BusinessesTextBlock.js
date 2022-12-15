import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBusinesses, fetchBusinesses } from "../../store/businesses";
import "./IndexPage.css";

const BusinessesTextBlock = () => {
  const dispatch = useDispatch();
  const businesses = useSelector(getBusinesses);

  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch]);

  const businessBlock = businesses.map((business, idx) => {
    return (
      <div className="business-card">
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

  return <div id="business-block">{businessBlock}</div>;
};

export default BusinessesTextBlock;
