import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses, getBusinesses } from "../../store/businesses";
import { useEffect } from "react";
import MainContent from "./MainContent";
import TitleCard from "./TitleCard";

const IndexPage = () => {
  const dispatch = useDispatch();
  const businesses = useSelector((state) => Object.values(state.businesses));

  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch]);

  if (!businesses.length)
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );

  return (
    <>
      <TitleCard businesses={businesses} />
      <MainContent businesses={businesses} />
    </>
  );
};

export default IndexPage;
