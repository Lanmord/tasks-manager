import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import axios from 'axios';
import { LoopCircleLoading } from 'react-loadingg';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setAuthStatus } from '../redux/actions/auth';
import { useDispatch } from 'react-redux';

function errorStyle(errors, fieldName) {
  if (getIn(errors, fieldName)) {
    return {
      border: '1px solid red',
    };
  }
}

const AuthForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="form_wrapper">
      <h2>Войти</h2>
      <Formik
        initialValues={{ password: '', username: '' }}
        validate={(values) => {
          const errors = {};

          if (!values.username) {
            errors.username = 'Поле обязательно для ввода';
          }
          if (!values.password) {
            errors.password = 'Поле обязательно для ввода';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          setIsLoading(true);

          let loginFormData = new FormData();
          loginFormData.set('username', values.username);
          loginFormData.set('password', values.password);

          axios.post('/login?developer=konstantin', loginFormData).then(({ data }) => {
            if (data.status === 'error') {
              setFieldError('password', 'Неверный логин или пароль');
            } else {
              localStorage.setItem('token', data.message.token);
              dispatch(setAuthStatus(true));
              history.push('/');
            }
            setIsLoading(false);
          });

          setSubmitting(false);
        }}>
        {({ isSubmitting, errors }) => (
          <Form className="task_form" noValidate>
            <div className="field">
              <label htmlFor="username">Имя пользователя</label>
              <Field style={errorStyle(errors, 'username')} type="text" name="username" />
              <ErrorMessage name="username" component="div" className="form_error" />
            </div>

            <div className="field">
              <label htmlFor="password">Пароль</label>
              <Field style={errorStyle(errors, 'password')} type="password" name="password" />
              <ErrorMessage name="password" component="div" className="form_error" />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn">
              Войти
            </button>
          </Form>
        )}
      </Formik>
      <div className={isLoading ? 'form_loading active' : 'form_loading'}>
        <LoopCircleLoading />
      </div>
    </div>
  );
};

export default AuthForm;
