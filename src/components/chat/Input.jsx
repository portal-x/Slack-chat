import { Form, InputGroup, Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

import { selectCurrentChannelID } from '../../redux/chatSlise';
import { UseUser } from '../../context/UserContext.jsx';
import { UseSocket } from '../../context/SocketContext.jsx';

const shema = Yup.object().shape({
  message: Yup.string().required(),
});

export default () => {
  const currentChanalId = useSelector(selectCurrentChannelID);
  const { user: { username } } = UseUser();
  const socket = UseSocket();

  const [sendStatus, changeSendStatus] = useState('ok');

  const inputRef = useRef(null);
  useEffect(() => inputRef.current.focus());

  const sendMess = async ({ message }, { resetForm }) => {
    changeSendStatus('sending');
    const container = {
      chanalId: currentChanalId,
      text: message,
      user: username,
    };

    const response = (res) => {
      if (res.status === 'ok') {
        changeSendStatus('ok');
        inputRef.current.select();
      }
    };

    socket.emit('newMessage', container, await response);
    resetForm();
  };

  return (
    <Formik
      validationSchema={shema}
      onSubmit={sendMess}
      initialValues={{
        message: '',
      }}
    >
      {({
        handleSubmit, handleChange, values, isValid,
      }) => (
        <Form className="border py-1 rounded-2" onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              className="border-0 p-0 ps-2"
              type="text"
              name="message"
              placeholder="Введите сообщение..."
              value={values.message}
              onChange={handleChange}
              disabled={sendStatus === 'sending'}
              ref={inputRef}
            />
            <div className="input-group-append">
              <Button
                type="submit"
                className="btn-group-vertical bg-white text-muted border-0"
                disabled={!isValid}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  />
                </svg>
                <span className="visually-hidden">Отправить</span>
              </Button>
            </div>
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
};
