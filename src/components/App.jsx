import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { UseUser } from '../context/UserContext.jsx';
import { UseSocket } from '../context/SocketContext.jsx';
import {
  addChannel,
  addMessages,
  renameChannel,
  setCurrentChanelId,
  removeChannel,
} from '../redux/chatSlise.js';
import Chat from './chat/Chat.jsx';
import Login from './Login.jsx';
import NoMatch from './NoMatch.jsx';
import Logout from './Logout.jsx';
import Registration from './Registration.jsx';

export default () => {
  const socket = UseSocket();
  const dispatch = useDispatch();

  socket.on('newMessage', (mess) => {
    dispatch(addMessages(mess));
  });
  socket.on('newChannel', (channal) => {
    dispatch(addChannel(channal));
    dispatch(setCurrentChanelId(channal.id));
  });
  socket.on('removeChannel', ({ id }) => {
    dispatch(setCurrentChanelId(1));
    dispatch(removeChannel(id));
  });
  socket.on('renameChannel', ({ id, name }) => {
    dispatch(renameChannel({ id, newName: name }));
  });

  const { user } = UseUser();

  return (
    <Router className="h-100">
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
              {user && <Logout />}
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
          <Route exact path="/signup">
            <Registration />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
        <footer className="text-end me-4">
          <span>
            © 2021 Developed by
            &nbsp;
            <a href="https://github.com/portal-x">Yurii Tkachuk</a>
            &nbsp;
            (Юрий Ткачук)
          </span>
        </footer>
      </div>
    </Router>
  );
};
