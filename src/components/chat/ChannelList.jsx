import { Col, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uniqueId } from 'lodash';

import {
  selectChanels,
  selectCurrentChannelID,
  setCurrentChanelId,
} from '../../redux/chatSlise';

const renderChannel = (channel) => {
  const dispatch = useDispatch();
  const currentChanalId = useSelector(selectCurrentChannelID);
  const { name, removable, id } = channel;
  const buttonVariant = id === currentChanalId ? 'secondary' : 'light';

  const MainChannel = () => (
    <Button
      variant={buttonVariant}
      className="w-100 px-4 rounded-0 text-start"
      onClick={() => dispatch(setCurrentChanelId(id))}
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  );
  const CustomChannel = () => {
    <Dropdown as={ButtonGroup}>
      <MainChannel />

      <Dropdown.Toggle
        split
        variant={buttonVariant}
        id="dropdown-split-basic"
      />

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>;
  };

  return (
    <li className="nav-item" key={uniqueId()}>
      {removable ? <CustomChannel /> : <MainChannel />}
    </li>
  );
};

export default () => {
  const channels = useSelector(selectChanels);

  return (
    <Col xs={12} md={2} className="border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 px-4">
        <span>Каналы</span>
        <Button variant="outline-primary" className="px-2 py-0" size="sm">
          +
        </Button>
      </div>
      <ul className="nav nav-pills nav-fill flex-column">
        {channels.map(renderChannel)}
      </ul>
    </Col>
  );
};
