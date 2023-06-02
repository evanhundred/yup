import LoginFormPage from "./components/LoginFormPage";
import { Switch, Route } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import IndexPage from "./components/IndexPage";
import BusinessShow from "./components/BusinessShow";
import Footer from "./components/Footer";
import NewReviewForm from "./components/NewReviewForm";
import EditReviewForm from "./components/EditReviewForm";
import SearchResults from "./components/SearchResults";
import BusinessAddUserPhotos from "./components/BusinessAddUserPhotos";
import BusinessPhotos from "./components/BusinessPhotos";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/businesses/:businessId">
          <BusinessShow />
          <Route path="/businesses/:businessId/search">
            {/* REMOVE PROPS - REDUNDANT */}
            <BusinessShow props="loadFromReviews" />
          </Route>
        </Route>
        <Route path="/biz-user-photos/:businessId">
          <BusinessAddUserPhotos />
        </Route>
        <Route path="/biz-photos/:businessId">
          <BusinessPhotos />
        </Route>
        <Route exact path="/">
          <IndexPage />
        </Route>
        <Route path="/businesses/:businessId/reviews/new">
          <NewReviewForm />
        </Route>
        <Route path="/businesses/:businessId/reviews/:id/edit">
          <EditReviewForm />
        </Route>
        <Route path="/search">
          <SearchResults />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
