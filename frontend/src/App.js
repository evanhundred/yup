import LoginFormPage from "./components/LoginFormPage";
import { Switch, Route } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route>
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
