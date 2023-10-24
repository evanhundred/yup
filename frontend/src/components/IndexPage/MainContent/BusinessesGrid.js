// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { getBusinesses, fetchBusinesses } from "../../store/businesses";

import photoBlank from "../../../assets/images/broccoli.png";

const BusinessesGrid = ({ businesses, loadState }) => {
  // console.log(businesses[0]);
  if (!businesses.length || businesses[0].status === 500)
    return (
      <div>
        <h1>loading businesses...</h1>
      </div>
    );

  // const startingSixBusinesses = businesses.slice(0, 6);

  const businessesLoaderSlice = businesses.slice(0, loadState);

  const photoIsPresent = (business) => {
    return business.imageUrls.length > 0;
  };

  const businessCardImage = (business) => {
    if (photoIsPresent(business)) return business.imageUrls[1];
    return photoBlank;
  };

  // const deliverBusinessName = (business) => {
  //   const isOverflown = (element) => {
  //     return element.scrollWidth > element.clientWidth;
  //   }

  // }
  const businessesBlock = businessesLoaderSlice.map((business, idx) => {
    return (
      <div className="business-card" key={idx}>
        <div
          className={`card-image${
            photoIsPresent(business) ? "" : " photo-blank"
          }`}
        >
          <Link to={`/businesses/${business.id}`}>
            <img src={businessCardImage(business)} alt={business.name} />
          </Link>
        </div>

        <div className="info-section">
          <h3>{business.name}</h3>
        </div>
      </div>
    );
  });

  return <div id="business-block">{businesses ? businessesBlock : ""}</div>;
};

export default BusinessesGrid;
