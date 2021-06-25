import { Container } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initChat, selectInitStatus, addMessages } from '../../redux/chatSlise.js';

import { UseUser } from '../../context/UserContext.jsx';
import { UseSocket } from '../../context/SocketContext.jsx';
import ChatBody from './ChatBody.jsx';
import Loading from './Loading.jsx';
import NetworkProblem from './NetworkProblem.jsx';

const maping = {
  loading: <Loading />,
  success: <ChatBody />,
  failed: <NetworkProblem />,
};

export default () => {
  console.log('chat is connected');
  const dispatch = useDispatch();
  const socket = UseSocket();

  const { user } = UseUser();
  useEffect(() => {
    dispatch(initChat(user.token));
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  const initStatus = useSelector(selectInitStatus);
  socket.on('newMessage', (mess) => {
    dispatch(addMessages(mess));
  });

  return (
    <Container className="h-100 my-4 owerflow-giden rounded shadow">
      {maping[initStatus]}
    </Container>
  );
};
