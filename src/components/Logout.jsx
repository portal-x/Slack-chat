import { Button } from 'react-bootstrap';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const history = useHistory();
  const handleExit = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };
  return (<Button className="btn btn-primary" onClick={handleExit}>Выйти</Button>);
};
