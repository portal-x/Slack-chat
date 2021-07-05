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
import { addChannel, addMessages, setCurrentChanelId } from '../redux/chatSlise.js';
import Chat from './chat/Chat.jsx';
import Login from './Login.jsx';
import NoMatch from './NoMatch.jsx';

export default () => {
  console.log('App is connected...');
  const socket = UseSocket();
  const dispatch = useDispatch();

  socket.on('newMessage', (mess) => {
    dispatch(addMessages(mess));
  });
  socket.on('newChannel', (channal) => {
    console.log('🚀 ~ socket.on ~ channal', channal.id);
    dispatch(addChannel(channal));
    dispatch(setCurrentChanelId(channal.id));
  });

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
