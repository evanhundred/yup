import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";

const BusinessShow = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));

  useEffect(() => {
    dispatch(fetchBusiness(businessId));
  }, []);

  // debugger;

  // const ParseAbout = () => {
  //   const businessArray = business.about.split("+++");
  //   // businessArray
  //   // debugger;
  //   return businessArray.map((paragraph) => <p>{paragraph}</p>);
  // };

  return (
    <>
      {/* <p>{JSON.stringify(business)}</p> */}
      <h1>{business.name}</h1>
      {/* <h2>{business.about}</h2> */}
      {/* <ParseAbout /> */}
    </>
  );
};

export default BusinessShow;
