import LoginFormPage from "./components/LoginFormPage";
import { Switch, Route } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import IndexPage from "./components/IndexPage";
import BusinessShow from "./components/BusinessShow";
import Footer from "./components/Footer";
import NewReviewForm from "./components/NewReviewForm";
import EditReviewForm from "./components/EditReviewForm";

function App() {
  return (
    <>
      <Switch>
        <Route path="/login">
          <Navigation />
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <Navigation />
          <SignupFormPage />
        </Route>
        <Route exact path="/businesses/:businessId">
          <Navigation />
          <BusinessShow />
        </Route>
        <Route exact path="/">
          <Navigation />
          <IndexPage />
        </Route>
        <Route path="/businesses/:businessId/reviews/new">
          <Navigation />
          <NewReviewForm />
        </Route>
        <Route path="/businesses/:businessId/reviews/:id/edit">
          <Navigation />
          <EditReviewForm />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
