import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import Login from './Login.jsx';
import NoMatch from './NoMatch.jsx';
import Test from './Test.jsx';

export default () => {
  console.log('app is connected');
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <nav
          className="shadow-sm navbar navbar-expand-lg
          navbar-light
          bg-white"
        >
          <div className="container">
            <Link className="navbar-brand" to="/">
              Chat
            </Link>
          </div>
        </nav>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/login/test">
            <Test />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

function Home() {
  return (
    <div className="card-body d-flex flex-column align-items-center p-5">
      <h2 className="h-100 p-3">Home</h2>
    </div>
  );
}
