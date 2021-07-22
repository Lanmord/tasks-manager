import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import axios from 'axios';
import { fetchTasks } from '../redux/actions/tasks';
import { useSelector, useDispatch } from 'react-redux';
import { LoopCircleLoading } from 'react-loadingg';
import { useState } from 'react';
import Modal from './Modal';

function errorStyle(errors, fieldName) {
  if (getIn(errors, fieldName)) {
    return {
      border: '1px solid red',
    };
  }
}

const TaskForm = () => {
  const dispatch = useDispatch();
  const { sortField, sortDirection, currentPage } = useSelector(({ tasks }) => tasks);
  const [isLoading, setIsLoading] = useState(false);

  const [modalActive, setModalActive] = useState(false);
  return (
    <div className="form_wrapper">
      <h2>Создать задачу</h2>
      <Formik
        initialValues={{ email: '', username: '', taskText: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Поле обязательно для ввода';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Некорректный email';
          }
          if (!values.username) {
            errors.username = 'Поле обязательно для ввода';
          }
          if (!values.taskText) {
            errors.taskText = 'Поле обязательно для ввода';
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
            setModalActive(true);
          });

          setSubmitting(false);
        }}>
        {({ isSubmitting, errors }) => (
          <Form className="task_form" noValidate>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <Field style={errorStyle(errors, 'email')} type="email" name="email" />
              <ErrorMessage name="email" component="div" className="form_error" />
            </div>

            <div className="field">
              <label htmlFor="username">Имя пользователя</label>
              <Field style={errorStyle(errors, 'username')} type="text" name="username" />
              <ErrorMessage name="username" component="div" className="form_error" />
            </div>

            <div className="field">
              <label htmlFor="taskText">Задача</label>
              <Field
                as="textarea"
                style={errorStyle(errors, 'taskText')}
                type="text"
                name="taskText"
              />
              <ErrorMessage name="taskText" component="div" className="form_error" />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn">
              Создать
            </button>
          </Form>
        )}
      </Formik>
      <div className={isLoading ? 'form_loading active' : 'form_loading'}>
        <LoopCircleLoading />
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <h2>Задача успешно создана! ✔️</h2>
        <button className="btn" onClick={() => setModalActive(false)}>
          ОК
        </button>
      </Modal>
    </div>
  );
};

export default TaskForm;
