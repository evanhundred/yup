const Amenities = ({ business }) => {
  return (
    <div className="amenitites card-container">
      <div className="main-title">
        <h2>Amenities & more</h2>
      </div>
      <div className="amenities-content">
        <div className="amenities-item">
          <div className="cross-symbol">
            <img
              src={require("../../../assets/images/cross.png")}
              alt="amenities"
            ></img>
          </div>

          <div className="health-score-box">
            <div className="health-score">
              <div className="blue">
                <h3>Health Score</h3>
              </div>
              <div>
                <h3>A</h3>
              </div>
            </div>
            <div className="caption">Powered by Hazel Analytics</div>
          </div>
        </div>

        <div className="amenities-item gray">
          <div className="x-symbol">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <h3>No Reservations</h3>
        </div>
        <div className="amenities-item gray">
          <div className="x-symbol">
            <i className="fa-solid fa-xmark"></i>
          </div>{" "}
          <h3>No Delivery</h3>
        </div>
        <div className="amenities-item gray">
          <div className="x-symbol">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <h3>No Takeout</h3>
        </div>
      </div>
      <div className="more-attributes-container">
        <div className="get-directions-container">
          <div className="get-directions-button">
            <a href="#">
              <h3>26 More Attributes</h3>
            </a>
          </div>
        </div>
      </div>
      <div className="main-content-div"></div>
    </div>
  );
};

export default Amenities;
