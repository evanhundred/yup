import LoginFormPage from "./components/LoginFormPage";
import { Switch, Route } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import IndexPage from "./components/IndexPage";

function App() {
  return (
    <>
      {/* <Navigation /> */}
      <Switch>
        <Route path="/login">
          <Navigation />
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <Navigation />
          <SignupFormPage />
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
