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

  return (
    // <>
    <div id="text-block">
      <p>{JSON.stringify(businesses)}</p>
    </div>
    // </>
  );
};

export default BusinessesTextBlock;
