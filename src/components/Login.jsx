/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import chatLogo from '../img/chatLogo.png';
import { UseUser } from '../context/UserContext.jsx';

export default () => {
  const history = useHistory();
  const [error, setError] = useState(null);

  const { setUser } = UseUser();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const { data: authUser } = await axios.post('/api/v1/login', values);
        setUser(authUser);
        localStorage.setItem('user', JSON.stringify(authUser));
        history.push('/');
        window.location.reload();
      } catch (e) {
        setError('Неверные имя пользователя или пароль');
      }
    },
  });

  const inputForFocus = useRef(null);
  useEffect(() => inputForFocus.current.focus(), []);

  return (
    <div className="container-fluid flex-grow-1">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-xl-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  className="shadow-sm rounded-circle"
                  src={chatLogo}
                  alt="Вход"
                />
              </div>
              <form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    name="username"
                    required
                    placeholder="ваш ник"
                    id="username"
                    className="form-control"
                    ref={inputForFocus}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  <label htmlFor="username">Введите логин:</label>
                  {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                  ) : null}
                </div>
                <div className="form-floating mb-4">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    required
                    placeholder="Пароль"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <label htmlFor="password">Введите пароль:</label>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
                <button className="w-100 btn btn-outline-primary" type="submit">
                  Submit
                </button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span className="me-2">Нет аккаунта?</span>
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
