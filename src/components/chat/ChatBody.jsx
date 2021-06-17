import { Row } from 'react-bootstrap';
import React from 'react';

import ChannelsList from './ChannelsList.jsx';
import MessagesList from './MessagesList.jsx';

export default () => (
  <Row className="h-100 bg-white">
    <ChannelsList />
    <MessagesList />
  </Row>
);
