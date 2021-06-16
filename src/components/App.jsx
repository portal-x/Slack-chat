import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import Chat from './chat/Chat.jsx';
import Login from './Login.jsx';
import NoMatch from './NoMatch.jsx';
import { UserProvider, UseUser } from '../UserContext.jsx';

const Main = () => {
  console.log('Main is rendering...');

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
            {!UseUser().user ? <Redirect to="/login" /> : <Chat />}
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default () => {
  console.log('render app...');
  return (
    <UserProvider>
      <Main />
    </UserProvider>
  );
};
