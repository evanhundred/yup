import { Switch, Route } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import IndexPage from './components/IndexPage';
import BusinessShow from './components/BusinessShow';
import Footer from './components/Footer';
import ReviewForm from './components/ReviewForm';
import SearchResults from './components/SearchResults';
import BusinessAddUserPhotos from './components/BusinessAddUserPhotos';
import BusinessPhotos from './components/BusinessPhotos';
import WriteAReviewSearch from './components/WriteAReviewSearch';
import AddBusinessAsOwner from './components/AddBusinessAsOwner';
import AddBusinessAsCustomer from './components/AddBusinessAsCustomer';
import EditBusiness from './components/EditBusiness';

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
        <Route exact path='/businesses/:businessId'>
          <BusinessShow />
          <Route path='/businesses/:businessId/search'>
            <BusinessShow />
          </Route>
        </Route>
        <Route path='/biz-user-photos/:businessId'>
          <BusinessAddUserPhotos />
        </Route>
        <Route path='/biz-photos/:businessId'>
          <BusinessPhotos />
        </Route>
        <Route exact path='/'>
          <IndexPage />
        </Route>
        <Route path='/businesses/:businessId/reviews/new'>
          <ReviewForm />
        </Route>
        <Route path='/businesses/:businessId/reviews/:id/edit'>
          <ReviewForm />
        </Route>
        <Route path='/search'>
          <SearchResults />
        </Route>
        <Route path='/write-a-review'>
          <WriteAReviewSearch />
        </Route>
        <Route path='/add-business-as-owner'>
          <AddBusinessAsOwner />
        </Route>
        <Route path='/businesses/:businessId/edit'>
          <EditBusiness />
        </Route>
        <Route path='/add-business-as-customer'>
          <AddBusinessAsCustomer />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
