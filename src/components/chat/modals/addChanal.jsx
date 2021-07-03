import React, { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { selectShowAddChan, switchAddChan } from '../../../redux/modalSlise';
import { selectChannels } from '../../../redux/chatSlise';
import { UseSocket } from '../../../context/SocketContext.jsx';

export default () => {
  const socket = UseSocket();
  const dispatch = useDispatch();
  const channals = useSelector(selectChannels)
    .map(({ name }) => name);
  const showModal = useSelector(selectShowAddChan);

  const handleClose = () => {
    dispatch(switchAddChan());
  };

  const shema = Yup.object().shape({
    channalName: Yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channals, 'Должно быть уникальным'),
  });

  const inputRef = useRef();
  useEffect(() => inputRef.current && inputRef.current.focus());

  const sendChanName = ({ channalName }) => {
    console.log('submit...', channalName);
    const container = {
      name: channalName,
    };

    const response = (res) => {
      console.log('статус сообщения:', res.status);
    };

    socket.emit('newChannel', container, response);
    handleClose();
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
          validateOnChange={false}
          onSubmit={sendChanName}
          initialValues={{
            channalName: '',
          }}
        >
          {({
            handleSubmit, handleChange, values, isValid, errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="validationFormik01">
                <Form.Control
                  type="text"
                  name="channalName"
                  placeholder="Имя канала"
                  value={values.channalName}
                  onChange={handleChange}
                  className="mb-2"
                  isInvalid={!isValid}
                  ref={inputRef}
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
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
