const MenuCard = ({ business }) => {
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
          <div className="popular-item-image">
            <img src={business.imageUrls[5]} alt="chocolate croissant" />
          </div>
          <div className="popular-item-name">
            <h2>Delicious Item</h2>
            <h3>1 Photo · 6 Reviews</h3>
          </div>
        </div>

        <div className="popular-item-subcard"></div>

        <div className="popular-item-subcard"></div>
      </div>

      <a href={business.website} target="_blank" rel="noreferrer">
        <div className="website-menu-link">
          <i className="fa-solid fa-up-right-from-square"></i>
          <h2>Website menu</h2>
        </div>
      </a>
    </div>
  );
};

export default MenuCard;
