import IndexPage from "./components/IndexPage";

function App() {
  return (
    <>
      {/* <Navigation />
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/businesses/:businessId">
          <BusinessShow />
        </Route>
        <Route exact path="/"> */}
      <IndexPage />
      {/* </Route>
        <Route path="/businesses/:businessId/reviews/new">
          <NewReviewForm />
        </Route>
        <Route path="/businesses/:businessId/reviews/:id/edit">
          <EditReviewForm />
        </Route>
      </Switch>
      <Footer /> */}
    </>
  );
}

export default App;
