import { Container } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initChat, selectInitStatus } from '../../redux/chatSlise.js';

import { UseUser } from '../../context/UserContext.jsx';
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
  // const socket = UseSocket();

  const { user } = UseUser();
  useEffect(() => {
    dispatch(initChat(user.token));
  }, []);

  const initStatus = useSelector(selectInitStatus);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      {maping[initStatus]}
    </Container>
  );
};
