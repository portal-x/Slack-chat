/* eslint-disable jsx-a11y/label-has-associated-control */
import { Form, Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UseUser } from '../context/UserContext.jsx';

export default () => {
  const [password, setPassword] = useState('bye');

  const shema = Yup.object().shape({
    name: Yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    pass: Yup.string().required('Обязательное поле').min(6, 'не менее 6 символов'),
    rePass: Yup.string().required('Обязательное поле').matches(password, 'Пароли должны совпадать'),
  });

  const [sendStatus, changeSendStatus] = useState('ok');
  const { setUser } = UseUser();
  const history = useHistory();

  const register = async ({ name: username, pass }, { resetForm }) => {
    try {
      const { data: authUser } = await axios
        .post('/api/v1/signup', { username, password: pass });
      setUser(authUser);
      localStorage.setItem('user', JSON.stringify(authUser));
      console.log('успех');
      history.push('/');
      // window.location.reload();
      resetForm();
    } catch (e) {
      if (e.message.includes('409')) {
        console.log('Такой пользователь уже есть');
      }
      // setError('Такой пользователь уже существует');
    }
  };

  const inputRef = useRef(null);
  useEffect(() => inputRef.current.focus());

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src="http://www.pharmatechexpo.com.ua/wp-content/uploads/2016/01/procedure.png" className="img-fluid" alt="Регистрация" />
              </div>
              <Formik
                validationSchema={shema}
                validateOnChange={false}
                onSubmit={register}
                initialValues={{
                  name: '',
                  pass: '',
                  rePass: '',
                }}
              >
                {
                  (
                    {
                      handleSubmit,
                      handleChange,
                      values,
                      isValid,
                      errors,
                      validateField,
                    },
                  ) => (
                    <Form className="w-50" onSubmit={handleSubmit}>
                      <h1 className="text-center mb-4">Регистрация</h1>
                      <Form.Group className="form-floating mb-3">
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Имя пользователя"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={() => validateField('name')}
                          isInvalid={errors.name?.length}
                          disabled={sendStatus === 'sending'}
                          ref={inputRef}
                        />
                        <label htmlFor="password">Имя пользователя</label>
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="form-floating mb-3">
                        <Form.Control
                          type="password"
                          name="pass"
                          placeholder="Пароль"
                          value={values.pass}
                          onChange={handleChange}
                          onBlur={() => {
                            setPassword(values.pass);
                            validateField('pass');
                          }}
                          isInvalid={errors.pass?.length}
                          disabled={sendStatus === 'sending'}
                        />
                        <label htmlFor="password">Пароль</label>
                        <Form.Control.Feedback type="invalid">
                          {errors.pass}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="form-floating mb-3">
                        <Form.Control
                          type="password"
                          name="rePass"
                          placeholder="Подтвердить пароль"
                          value={values.rePass}
                          onChange={handleChange}
                          onBlur={() => validateField('rePass')}
                          isInvalid={errors.rePass?.length}
                          disabled={sendStatus === 'sending'}
                        />
                        <label htmlFor="password">Подтвердите пароль:</label>
                        <Form.Control.Feedback type="invalid">
                          {errors.rePass}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Button
                        type="submit"
                        disabled={!isValid}
                        variant="outline-primary"
                        className="w-100"
                      >
                        Зарегистрироваться
                      </Button>
                    </Form>
                  )
                }
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
