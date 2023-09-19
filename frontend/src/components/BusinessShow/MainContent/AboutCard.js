const ParsedAbout = ({ business }) => {
  const paragraphs = business.about.split(123);
  return paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>);
};

const AboutCard = ({ business }) => {
  return (
    <>
      <div className="about card-container">
        <div className="main-title">
          <h2>About the business</h2>
        </div>
        <div className="about-text">{<ParsedAbout business={business} />}</div>
        {/* <div className="read-more-button-container">
          <div className="read-more-button get-directions-button">
            <h3>
              <a href="#">Read more</a>
            </h3>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default AboutCard;
