import { Col } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentChannelID, selectMssages } from '../../redux/chatSlise';

const buildwordEnding = (numPosts) => {
  if (numPosts === 1) return 'сообщение';
  if (numPosts >= 2 && numPosts <= 4) return 'сообщения';
  return 'сообщений';
};

export default () => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMssages);
  const currentChanalId = useSelector(selectCurrentChannelID);
  const channelMess = messages.filter((mess) => mess.id === currentChanalId);
  const messCount = channelMess.length;

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>#</b>
          </p>
          <span className="text-muted">
            {`${messCount} ${buildwordEnding(messCount)}`}
          </span>
        </div>
      </div>
    </Col>
  );
};
