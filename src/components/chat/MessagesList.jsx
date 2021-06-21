import { Col, Form, InputGroup, Button } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentChannelID, selectMssages } from '../../redux/chatSlise';

const buildwordEnding = (numPosts) => {
  if (numPosts === 1) return 'е';
  if (numPosts >= 2 && numPosts <= 4) return 'я';
  return 'й';
};

export default () => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMssages);
  const currentChanalId = useSelector(selectCurrentChannelID);
  const channelMess = messages.filter(
    (mess) => mess.chanalId === currentChanalId
  );
  const messCount = channelMess.length;

  const handleSubmit = (e) => {
    console.log('submiting');
  };

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>#</b>
          </p>
          <span className="text-muted">
            {`${messCount} сообщени${buildwordEnding(messCount)}`}
          </span>
        </div>
        <div className="chat-messages overflow-auto px-5" id="messages-box">
          mess was here
          {channelMess.map(({ user, text }) => (
            <div className="text-break mb-2">
              <b>{user}</b>:{text}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form className="border py-1 rounded-2" onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                className="border-0 p-0 ps-2"
                type="text"
                placeholder="Введите сообщение..."
              />
              <div className="input-group-append">
                <Button
                  type="submit"
                  className="btn-group-vertical bg-white text-muted border-0"
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
        </div>
      </div>
    </Col>
  );
};
