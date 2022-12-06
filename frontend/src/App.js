import LoginFormPage from "./components/LoginFormPage";
import { Switch, Route } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route>
        <SignupFormPage />
      </Route>
    </Switch>
  );
}

export default App;
