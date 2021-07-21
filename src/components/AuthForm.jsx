import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import axios from 'axios';
import { fetchTasks } from '../redux/actions/tasks';
import { useSelector, useDispatch } from 'react-redux';
import { LoopCircleLoading } from 'react-loadingg';
import { useState } from 'react';

function errorStyle(errors, fieldName) {
  if (getIn(errors, fieldName)) {
    return {
      border: '1px solid red',
    };
  }
}

const AuthForm = () => {
  const dispatch = useDispatch();
  const { sortField, sortDirection, currentPage } = useSelector(({ tasks }) => tasks);
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
        onSubmit={(values, { setSubmitting }) => {
          setIsLoading(true);

          let taskFormData = new FormData();
          taskFormData.set('email', values.email);
          taskFormData.set('username', values.username);
          taskFormData.set('text', values.taskText);
          taskFormData.set('status', 0);

          axios.post('/create?developer=konstantin', taskFormData).then(() => {
            dispatch(fetchTasks(sortField, sortDirection, currentPage));
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
