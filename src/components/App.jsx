import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
// import axios from 'axios';

import Chat from './Chat.jsx';
import Login from './Login.jsx';
import NoMatch from './NoMatch.jsx';
import UserContext from '../UserContext.jsx';

export default () => {
  console.log('app is rendering...');

  const [user, setUser] = useState();

  const prewUserData = localStorage.getItem('user');
  if (prewUserData) {
    console.log('storage with user');
    const prewUser = JSON.parse(prewUserData).username;
    console.log('🚀 ~ prewUser', prewUser);
    // setUser(prewUser);
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
              {!user ? <Redirect to="/login" /> : <Chat />}
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
};
