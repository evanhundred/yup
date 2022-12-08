import LoginFormPage from "./components/LoginFormPage";
import { Switch, Route } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import IndexPage from "./components/IndexPage";
import BusinessShow from "./components/BusinessShow";

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
        <Route path="/businesses/:businessId">
          <Navigation />
          <BusinessShow />
        </Route>
        <Route exact path="/">
          <Navigation />
          <IndexPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
