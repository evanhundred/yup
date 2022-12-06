import LoginFormPage from "./components/LoginFormPage";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
