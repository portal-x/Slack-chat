import { Row, Col, Button } from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';
import { uniqueId } from 'lodash';

import { selectChanels } from '../../redux/chatSlise';

export default () => {
  const channels = useSelector(selectChanels);
  console.log('каналы:', channels);
  return (
    <Row className="h-100 bg-white">
      <Col xs={12} md={2} className="border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 px-4">
          <span>Каналы</span>
          <Button variant="outline-primary" className="px-2 py-0" size="sm">
            +
          </Button>
        </div>
        <ul className="nav nav-pills nav-fill flex-column">
          {channels.map((channel) => {
            const { name, removable } = channel;
            return <li className="nav-item" key={uniqueId()}>{`# ${name}`}</li>;
          })}
        </ul>
      </Col>
      <Col className="p-0 h-100">
        messages will be here...................................
      </Col>
    </Row>
  );
};
