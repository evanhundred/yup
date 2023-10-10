import "./index.css";

const AddBusinessAsOwner = () => {
  const handleBusinessNameSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div id="add-business-owner-container">
      <div className="prompt">
        <h2 className="prompt-title">
          Hello. Let's start with your business name
        </h2>
        <p className="prompt-text">
          We'll use this information to help you claim your Yelp page. Your
          business will come up automatically if it is already listed.
        </p>
      </div>
      <div className="business-name-input-form">
        <form onSubmit={(e) => handleBusinessNameSubmit(e)}>
          <input className="business-name" placeholder="Your business name" />
          <button className="continue">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default AddBusinessAsOwner;
