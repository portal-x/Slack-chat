import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initChat, selectChanels } from '../redux/chatSlise.js';

import { UseUser } from '../UserContext.jsx';

export default () => {
  console.log('chat is connected');
  const dispatch = useDispatch();

  const { user } = UseUser();
  useEffect(() => {
    dispatch(initChat(user.token));
  }, []);

  const channels = useSelector(selectChanels);
  console.log('каналы:', channels);

  return (
    <>
      <div>chat will be here...</div>
    </>
  );
};
