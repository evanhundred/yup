import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
        <h3>{business.name}</h3>
      </div>
    );
  });

  return (
    // <>
    <div id="text-block">
      {/* <p>{JSON.stringify(businesses)}</p> */}
      {businessBlock}
    </div>
    // </>
  );
};

export default BusinessesTextBlock;
