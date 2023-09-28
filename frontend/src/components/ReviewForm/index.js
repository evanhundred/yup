import { useRouteMatch } from "react-router-dom";

// import "./index.css";
// import "./review-guidelines-modal.css";

const ReviewForm = () => {
  const match = useRouteMatch();

  switch (match.path) {
    case "/businesses/:businessId/reviews/:id/edit":
      console.log("edit!");
      break;
    case "/businesses/:businessId/reviews/new":
      console.log("new!");
      break;
    default:
      break;
  }

  return <div>review form.</div>;
};

export default ReviewForm;
