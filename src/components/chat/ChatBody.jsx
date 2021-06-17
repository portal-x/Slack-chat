import { Row, Col } from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';

import { selectChanels, selectCurrentChannelID } from '../../redux/chatSlise';
import ChannelList from './ChannelList.jsx';

export default () => {
  const channels = useSelector(selectChanels);
  const currentChanalId = useSelector(selectCurrentChannelID);
  return (
    <Row className="h-100 bg-white">
      <ChannelList />
      <Col className="p-0 h-100">
        messages will be here...................................
      </Col>
    </Row>
  );
};
