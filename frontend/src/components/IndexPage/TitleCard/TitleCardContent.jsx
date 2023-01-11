import SearchIcon from "../../../assets/images/search.png";

const TitleCardContent = ({ business }) => {
  const FirstLine = () => {
    return (
      <>
        <h1>Mind-blowing coffee</h1>
      </>
    );
  };
  const SecondLine = () => {
    return (
      <div className="second-line">
        <img src={SearchIcon} alt="" />
        <h3>Coffee</h3>
      </div>
    );
  };

  return (
    <>
      <div className="business-title-card">
        <FirstLine />
        <SecondLine />
      </div>
    </>
  );
};
export default TitleCardContent;
