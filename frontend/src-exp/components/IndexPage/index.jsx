import "./index.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses } from "../../store/businesses";
import IndexPhotoCard from "../../assets/restaurant-skyline.jpg";

const SectionHeader = ({ title }) => {
  const textContent = title.text;
  return (
    <div className="section-header">
      <h2>{textContent}</h2>
    </div>
  );
};

const IndexPage = () => {
  const businesses = useSelector((state) => Object.values(state.businesses));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch]);
  console.log(businesses);
  // debugger;
  if (!businesses.length)
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  return (
    <>
      <div className="image-height-reset" />
      <div className="image-container">
        <img src={IndexPhotoCard} alt="outdoor dining" />
      </div>
      <h1>Hello</h1>
      <ul>
        Businesses:
        <li>{businesses[0].name}</li>
        {/* <li>{businesses ? businesses[0].name : "error"}</li> */}
      </ul>
    </>
  );
};
export default IndexPage;
