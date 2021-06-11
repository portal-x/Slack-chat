import React from 'react';
import axios from 'axios';

import { UseUser } from '../UserContext.jsx';

const getData = async (token) => {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get('/api/v1/data', { headers });
  console.log('🚀 ~ из try:', response.data);
  return response.data;
};

export default () => {
  console.log('chat is connected');
  const { user } = UseUser();
  const data = getData(user.token);
  data.then((d) => console.log('d:', d));
  console.log('🚀 ~ data', data);

  return (
    <>
      <div>chat will be here...</div>
    </>
  );
};
