import { Button } from 'react-bootstrap';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { UseUser } from '../context/UserContext.jsx';

export default () => {
  const history = useHistory();
  const { setUser } = UseUser();

  const handleExit = () => {
    localStorage.removeItem('user');
    setUser(null);
    history.push('/login');
  };
  return (<Button className="btn btn-primary" onClick={handleExit}>Выйти</Button>);
};
