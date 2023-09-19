import { Link } from "react-router-dom";
import "./BusinessResultCard.css";
import PresentStars from "./PresentStars";
import CommentIcon from "../../assets/images/message.png";
import { useHistory, useLocation } from "react-router-dom";

const BusinessResultCard = ({ business, idx }) => {
  const history = useHistory();

  const location = useLocation();

  // if (location.search === "?goToReviews") {
  //   const reviewsElement = document.getElementById("reviews-container");
  //   reviewsElement.scrollIntoView({
  //     behavior: "smooth"
  //   });
  // this.targetRef.scrollIntoView({
  //   behavior: "smooth"
  // });
  // }

  // browser behaves erratically on mouseover
  const addHoverShadow = (card) => {
    card.classList.remove("unhovered");
    card.classList.add("hovered");
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

    // timeString = "7:00 PM" (closedAt)
    const extractTimeNumber = (timeString) => {
      let bizHourNumber;
      let bizMinuteNumber;

      for (let i = 0; i < timeString.length; i++) {
        if (timeString[i] === ":") {
          bizHourNumber = timeString.slice(0, i);
          bizMinuteNumber = timeString.slice(i + 1, i + 3);
        }
      }

      const amOrPm = timeString.slice(timeString.length - 2);
      let hourInteger = parseInt(bizHourNumber, 10);
      if (amOrPm === "PM") hourInteger += 12;

      // debugger;
      return hourInteger * 100 + parseInt(bizMinuteNumber, 10);
    };

    const date = new Date();
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();
    const currentTime = currentHour * 100 + currentMinute;

    // scenarios
    // 1. before open
    // 2. after open, before close
    // 3. after close

    let openOrClosed;
    let untilString;
    // scenario 1
    if (currentTime < extractTimeNumber(business.openAt)) {
      openOrClosed = "Closed";
      untilString = ` until ${business.openAt}`;
    } else {
      // scenario 2
      if (currentTime < extractTimeNumber(business.closedAt)) {
        openOrClosed = "Open";
        untilString = ` until ${business.closedAt}`;
      } else {
        // scenario 3
        openOrClosed = "Closed";
        untilString = ` until ${business.openAt} tomorrow`;
      }
    }

    // ? NEED TO ACCOUNT FOR TIME ZONE DIFFERENCE

    return (
      <p className="open-or-closed">
        <span
          className={`first-word ${
            openOrClosed === "Open" ? "open" : "closed"
          }`}
        >
          {openOrClosed}
        </span>
        {untilString}
      </p>
    );
  };

  // TODO: selected comment must contain category keyword from search,
  //   which will show up highlighted as part of a review snippet.
  const SelectedComment = () => {
    const getTopComment = () => {
      if (!business.reviews.length) return <p>no reviews</p>;
      const review = business.reviews[0];

      return review.body;
    };

    // debugger;

    if (!business) return null;

    // "more" link":
    //     https://www.yelp.com/biz/coffee-project-new-york-east-village-new-york?hrid=GK4Ua8tItCVFInW6z8fR9w&osq=Coffee

    return (
      <div
        className="selected-comment-container"
        onClick={(e) => {
          handleReviewsClick(e);
        }}
      >
        <div className="selected-comment-bubble-icon">
          <img src={CommentIcon} alt="featured review" />
        </div>
        <p className="selected-comment-text">
          "{getTopComment()}"<span className="more-text"> more</span>
        </p>
      </div>
    );
  };

  const handleReviewsClick = (e) => {
    e.preventDefault();
    history.push({
      pathname: `/businesses/${business.id}`,
      search: "?reviews",
      state: { scrollToReviews: true }
    });
  };

  // const handleClick = (e) => {
  //   if ((e.target.className = "more-text")) {
  //     history.push(`/businesses/${business.id}`);
  //     // else history.push
  //     // return (
  //     //   <Link
  //     //     className="more-link"
  //     //     to={{
  //     //       pathname: `/businesses/${business.id}`,
  //     //       state: {
  //     //         fromSearch: true
  //     //       }
  //     //     }}
  //     //   ></Link>
  //     // );
  //   }
  // };

  return (
    <Link to={`/businesses/${business.id}`}>
      <div
        className="business-card-container unhovered"
        onMouseEnter={(e) => addHoverShadow(e.target)}
        onMouseLeave={(e) => removeHoverShadow(e.target)}
        // onClick={(e) => handleClick(e.target)}
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
          <OpenOrClosed />
          <SelectedComment />
        </div>
      </div>
    </Link>
  );
};

export default BusinessResultCard;
