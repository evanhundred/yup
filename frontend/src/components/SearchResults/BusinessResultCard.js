import { Link } from "react-router-dom";
import "./BusinessResultCard.css";
import PresentStars from "./PresentStars";

const BusinessResultCard = ({ business, idx }) => {
  // browser behaves erratically on mouseover
  const addHoverShadow = (card) => {
    card.classList.remove("unhovered");
    card.classList.add("hovered");
    // const verticalResetDiv = document.createElement("div");
    // verticalResetDiv.className = "shadow-reset";
    // card.appendChild(verticalResetDiv);
  };
  const removeHoverShadow = (card) => {
    card.classList.remove("hovered");
    card.classList.add("unhovered");
  };

  // categoryTags logic:
  // check if business.category is a string or an array
  // if array, make a tag for each element (category)
  // if string, make one tag
  // this works with the current format of businesses, which is a string containing a single
  // category entry. it also allows future entities to be added, or any to be changed,
  // to match the array + multiple category format.

  // two approaches:
  // 1. simple, hacky approach. separate categories out by comma, this is how I initialized the seeds
  // 2. thorough, dynamic approach. convert seed files to have category as array.
  // I will take the first approach in the interests of time at this point.
  // This is a common decision to make when producing this clone. What features shall be implemented,
  // how, and how to deal with the complexity.
  // the first approach adds technical debt,and is more messy and confusing. However, at this point
  // it is much easier to apply, and I have to choose my battles so I can complete the clone.
  const CategoryTags = () => {
    const tagsArray = business.category.split(",");

    return (
      <div className="category-tags">
        {tagsArray.map((cat) => (
          <p key={cat} className="tag-bubble">
            {cat}
          </p>
        ))}
      </div>
    );

    // if (typeof business.category === "string") {
    //   const categoryText = business.category;
    //   return (
    //     <div className="category-tags">
    //       <p>{categoryText}</p>
    //     </div>
    //   );
    // }
  };

  const PriceRating = () => {
    return (
      <div className="price-rating">
        <p className="price-rating-text">{business.price}</p>
      </div>
    );
  };

  const OpenOrClosed = () => {
    // const currentTime =
    // this is a key function
    // we need to calculate the business' open/close time based on the
    // time difference between the business' location and the user's
    // location.

    const extractTimeNumber = (timeString) => {
      let bizHourNumber;
      let bizMinuteNumber;

      for (let i = 0; i < timeString.length; i++) {
        if (timeString[i] === ":") {
          bizHourNumber = parseInt(timeString.slice(0, i), 10);
          bizMinuteNumber = parseInt(timeString.slice(i + 1, i + 3), 10);
        }
      }

      const amOrPm = timeString.slice(timeString.length - 2);
      if (amOrPm === "PM") bizHourNumber += 12;

      return bizHourNumber + bizMinuteNumber;
    };

    const date = new Date();
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();
    const currentTime = currentHour + currentMinute;

    // scenarios
    // 1. before open
    // 2. after open, before close
    // 3. after close

    let openOrClosed;
    let untilString;
    if (currentTime < extractTimeNumber(business.openAt)) {
      // scenario 1
      openOrClosed = "Closed";
      untilString = `until ${business.openAt}`;
    } else {
      // scenario 2
      if (currentTime < extractTimeNumber(business.closedAt)) {
        openOrClosed = "Open";
        untilString = `until ${business.closedAt}`;
      } else {
        // scenario 3
        openOrClosed = "Closed";
        untilString = ` until ${business.openAt} tomorrow`;
      }
    }

    return (
      <p>
        <span className="first-word">{openOrClosed}</span>
        {untilString}
      </p>
    );
  };

  return (
    <Link to={`/businesses/${business.id}`}>
      <div
        className="business-card-container unhovered"
        onMouseEnter={(e) => addHoverShadow(e.target)}
        onMouseLeave={(e) => removeHoverShadow(e.target)}
      >
        <div className="business-photo-container">
          <img src={business.imageUrls[5]} alt="delicious item" />
        </div>
        <div className="business-info">
          <div className="business-title">
            <p>
              {idx}. {business.name}
            </p>
          </div>
          {/* <div className="star-rating"> */}
          <PresentStars business={business} />
          {/* </div> */}
          <div className="third-line-search-results">
            <CategoryTags />
            <PriceRating />
            <p className="dot">•</p>
            <p className="city">{business.city}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BusinessResultCard;
