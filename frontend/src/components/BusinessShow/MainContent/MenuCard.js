import defaultItem from "../../../assets/images/stub/pie.jpeg";

const MenuCard = ({ business }) => {
  const isStub = business.stub === "true";
  const featuredImage = () => (isStub ? defaultItem : business.imageUrls[5]);
  // console.log(isStub);
  const businessWebsite =
    business.stub === "true" ? "https://yup.evanryan.dev" : business.website;

  const websiteLinkComponent = (
    <a href={businessWebsite} target="_blank" rel="noreferrer">
      <div className="website-menu-link">
        <i className="fa-solid fa-up-right-from-square"></i>
        <h2>Website menu</h2>
      </div>
    </a>
  );
  const stubWebsiteComponent = (
    <div className="website-menu-link">
      <i className="fa-solid fa-up-right-from-square"></i>
      <h2>Website:</h2>
      <h2>{business.website}</h2>
    </div>
  );
  const getWebsiteComponent = () => {
    let componentToRender;
    if (business.stub === "true") componentToRender = stubWebsiteComponent;
    else componentToRender = websiteLinkComponent;
    return componentToRender;
  };
  return (
    <div className="menu-bar card-container">
      <div className="main-title">
        <h2>Menu</h2>
      </div>

      <div className="subtitle">
        <h3>Popular dishes</h3>
      </div>

      <div className="popular-items-bar">
        <div className="popular-item-subcard">
          <div className={`popular-item-image${isStub ? " stub" : ""}`}>
            <img
              src={featuredImage()}
              alt="chocolate croissant"
              className="stub"
            />
          </div>
          <div className="popular-item-name">
            <h2>Delicious Item</h2>
            <h3>1 Photo · 6 Reviews</h3>
          </div>
        </div>

        <div className="popular-item-subcard"></div>

        <div className="popular-item-subcard"></div>
      </div>

      {getWebsiteComponent()}
      {/* <a href={businessWebsite} target="_blank" rel="noreferrer">
        <div className="website-menu-link">
          <i className="fa-solid fa-up-right-from-square"></i>
          <h2>Website menu</h2>
        </div>
      </a> */}
    </div>
  );
};

export default MenuCard;
