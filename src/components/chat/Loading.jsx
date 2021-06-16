import { Spinner } from 'react-bootstrap';
import React from 'react';

export default () => (
  <div className="card-body d-flex flex-column justify-content-around align-items-center p-5">
    <h3>chat is loading...</h3>
    <Spinner animation="border" variant="primary" />
  </div>
);
