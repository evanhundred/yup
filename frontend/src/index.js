import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './reset.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import * as businessActions from './store/businesses';
import * as bizPhotoBoxActions from './store/bizPhotoBoxes';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.businessActions = businessActions;
  window.bizPhotoBoxActions = bizPhotoBoxActions;
}

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

const renderApplication = () => {
  let container = null;

  // console.log('render');
  if (!container) {
    container = document.getElementById('root');
    const root = createRoot(container);
    root.render(
      <div>
        <React.StrictMode>
          <Root />
        </React.StrictMode>
      </div>
    );
  }

  // document.addEventListener('DOMContentLoaded', function () {
  //   console.log('render');
  //   if (!container) {
  //     container = document.getElementById('root');
  //     const root = createRoot(container);
  //     root.render(
  //       <div>
  //         <React.StrictMode>
  //           <Root />
  //         </React.StrictMode>
  //       </div>
  //     );
  //   }
  // });
};

// if (sessionStorage.getItem('X-CSRF-Token') === null) {
//   // console.log('xcsrf === null');
//   restoreCSRF().then(renderApplication);
// } else {
//   renderApplication();
// }

if (sessionStorage.getItem('currentUser') === null || sessionStorage.getItem('X-CSRF-Token') === null) {
  // console.log('else');
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  // console.log('else');
  renderApplication();
}
