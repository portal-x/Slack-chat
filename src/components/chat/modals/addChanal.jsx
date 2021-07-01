import React from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { selectShowAddChan, switchAddChan } from '../../../redux/modalSlise';

export default () => {
  const dispatch = useDispatch();
  const showModal = useSelector(selectShowAddChan);

  const handleClose = () => {
    dispatch(switchAddChan());
  };

  const shema = Yup.object().shape({
    channalName: Yup.string().required().min(3),
  });

  const sendChanName = ({ channalName }, { resetForm }) => {
    console.log('submit...', channalName);
    console.log('!!!');
    // changeSendStatus('sending');
    // const messContainer = {
    //   chanalId: currentChanalId,
    //   text: message,
    //   user: username,
    // };

    // const response = (res) => {
    //   console.log('статус сообщения:', res.status);
    //   if (sendStatus === 'ok') {
    //     changeSendStatus(sendStatus);
    //     inputRef.current.focus();
    //   }
    // };

    // socket.emit('newMessage', messContainer, response);
    resetForm();
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        />
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={shema}
          onSubmit={sendChanName}
          initialValues={{
            channalName: '',
          }}
        >
          {({
            handleSubmit, handleChange, values, isValid, errors,
          }) => {
            console.log('isValid:', isValid);
            console.log('errors:', errors);
            return (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="validationFormik01">
                <Form.Control
                  type="text"
                  name="channalName"
                  placeholder="Имя канала"
                  value={values.channalName}
                  onChange={handleChange}
                  required
                  className="mb-2"
                  isInvalid={!!errors.channalName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.channalName}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={handleClose} className="me-2">
                  Отменить
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                >
                  Отправить
                </Button>
              </div>
            </Form>
          )
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
