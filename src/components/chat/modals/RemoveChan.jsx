import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UseSocket } from '../../../context/SocketContext.jsx';
import { removeChannel, setCurrentChanelId } from '../../../redux/chatSlise.js';
import {
  selectShowRemChan,
  switchRemoveChan,
} from '../../../redux/modalSlise.js';

export default ({ id }) => {
  const socket = UseSocket();
  const dispatch = useDispatch();

  const showModal = useSelector(selectShowRemChan);

  const handleClose = () => dispatch(switchRemoveChan());

  const response = ({ status }) => {
    if (status === 'ok') {
      dispatch(setCurrentChanelId(1));
      dispatch(removeChannel(id));
    }
  };
  const hadleRemove = () => {
    socket.emit('removeChannel', { id }, response);
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Удалить канал</Modal.Title>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose} className="me-2">
            Отменить
          </Button>
          <Button variant="danger" onClick={hadleRemove}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
