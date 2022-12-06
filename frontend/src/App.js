import LoginFormPage from "./components/LoginFormPage";
import { Switch, Route } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";

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
        </Route>
      </Switch>
    </>
  );
}

export default App;
