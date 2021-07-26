import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectShowAlarm,
  switchAlarm,
} from '../../../redux/modalSlise.js';

export default () => {
  const dispatch = useDispatch();

  const showModal = useSelector(selectShowAlarm);

  const handleClose = () => dispatch(switchAlarm());

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Body>
        <Alert variant="danger">Ups... We hame problem with network. Please, try again later!</Alert>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose} className="me-2">
            Закрыть
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
