import LoginFormPage from "./components/LoginFormPage";
import { Switch, Route } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import IndexPage from "./components/IndexPage";
import BusinessShow from "./components/BusinessShow";
import Footer from "./components/Footer";

// import { useState, useEffect } from "react";

function App() {
  // const [businesses, setBusinesses] = useState([]);

  // useEffect(() => {
  //   const fetchBusinesses = async () => {
  //     const res = await fetch("/api/businesses");
  //     setBusinesses(await res.json());
  //   };
  //   fetchBusinesses();
  // }, []);
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
      <Footer />
    </>
  );
}

export default App;
