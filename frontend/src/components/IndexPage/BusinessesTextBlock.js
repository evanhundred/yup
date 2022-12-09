import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinesses, fetchBusinesses } from "../../store/businesses";

const BusinessesTextBlock = () => {
  const dispatch = useDispatch();
  const businesses = useSelector(getBusinesses);

  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch]);

  return (
    // <>
    <p>{JSON.stringify(businesses)}</p>
    // </>
  );
};

export default BusinessesTextBlock;
