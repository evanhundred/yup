import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness, fetchBusiness } from "../../store/businesses";
import "./index.css";

// debugger;
const BusinessShow = () => {
  // debugger;
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector(getBusiness(businessId));

  useEffect(() => {
    // debugger;
    dispatch(fetchBusiness(businessId));
  }, [businessId, dispatch]);

  // ;

  // const ParseAbout = () => {
  //   const businessArray = business.about.split("+++");
  //   // businessArray
  //   // ;
  //   return businessArray.map((paragraph) => <p>{paragraph}</p>);
  // };

  // const businessImage =

  return (
    <>
      {/* <p>{JSON.stringify(business)}</p> */}
      <div class="business-image">
        <img src={require("../../assets/images/1-devocion/storefront.jpg")} />
      </div>
      <div id="business-title-card">
        <h1>{business.name}</h1>
      </div>

      {/* <h2>{business.about}</h2> */}
      {/* <ParseAbout /> */}
    </>
  );
};

export default BusinessShow;
