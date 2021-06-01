import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

import Login from './Login.jsx';
import NoMatch from './NoMatch.jsx';

export default () => {
  console.log('app is connected');
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <header>
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
        </header>
        <Switch>
          <Route exact path="/login">
            <Login />
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
  const history = useHistory();
  const handleClick = () => {
    history.push('/login');
  };
  return (
    <div className="card-body d-flex flex-column align-items-center p-5">
      <h2 className="h-100 p-3">Home</h2>
      <button type="button" onClick={handleClick} className="btn btn-success">Login</button>
    </div>
  );
}
