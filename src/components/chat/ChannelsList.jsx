import {
  Col,
  Button,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uniqueId } from 'lodash';

import {
  selectChannels,
  selectCurrentChannelID,
  setCurrentChanelId,
} from '../../redux/chatSlise';
import AddChanalModal from './modals/addChanal.jsx';
import { switchAddChan } from '../../redux/modalSlise';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChanalId = useSelector(selectCurrentChannelID);
  const { name, removable, id } = channel;
  const buttonVariant = id === currentChanalId ? 'secondary' : 'light';

  const Body = () => (
    <Button
      variant={buttonVariant}
      className="w-100 rounded-0 text-start pe-0"
      onClick={() => dispatch(setCurrentChanelId(id))}
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  );

  const CustomChannel = () => (
    <Dropdown as={ButtonGroup} className="text-break w-100">
      <Body />
      <Dropdown.Toggle
        split
        variant={buttonVariant}
        id="dropdown-split-basic"
        className="rounded-0"
      />
      <Dropdown.Menu className="position-fixed">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return removable ? <CustomChannel /> : <Body />;
};

export default () => {
  const channels = useSelector(selectChannels);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(switchAddChan());
  };

  return (
    <>
      <Col xs={12} md={2} className="border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 px-4">
          <span>Каналы</span>
          <Button
            variant="outline-primary"
            className="px-2 py-0"
            size="sm"
            onClick={handleClick}
          >
            +
          </Button>
        </div>
        <ul className="nav navbar-nav-scroll">
          {channels.map((channel) => (
            <li className="nav-item w-100" key={uniqueId()}>
              <Channel channel={channel} />
            </li>
          ))}
        </ul>
      </Col>
      <AddChanalModal />
    </>
  );
};
