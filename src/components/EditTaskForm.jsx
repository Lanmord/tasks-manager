import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import axios from 'axios';
import { fetchTasks } from '../redux/actions/tasks';
import { useSelector, useDispatch } from 'react-redux';
import { LoopCircleLoading } from 'react-loadingg';
import { useState } from 'react';
import Modal from './Modal';
import { setAuthStatus } from '../redux/actions/auth';

function errorStyle(errors, fieldName) {
  if (getIn(errors, fieldName)) {
    return {
      border: '1px solid red',
    };
  }
}

const statusItems = [
  { num: 0, status: 'Не выполнена', isChanged: false },
  { num: 1, status: 'Не выполнена', isChanged: true },
  { num: 10, status: 'Выполнена', isChanged: false },
  { num: 11, status: 'Выполнена', isChanged: true },
];

const EditTaskForm = ({ taskInfo, onClose, hideChangeFields }) => {
  const dispatch = useDispatch();
  const { sortField, sortDirection, currentPage } = useSelector(({ tasks }) => tasks);
  const [isLoading, setIsLoading] = useState(false);
  const [primaryText] = useState(taskInfo.text);

  const [modalActive, setModalActive] = useState(false);

  const onErrorAuth = () => {
    setModalActive(false);
    dispatch(setAuthStatus(false));
  };

  return (
    <div className="form_wrapper">
      <h2>Редактировать задачу</h2>
      <Formik
        initialValues={{
          taskText: taskInfo.text,
          status: statusItems.find((obj) => obj.num === taskInfo.status).status,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.taskText) {
            errors.taskText = 'Поле обязательно для ввода';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setIsLoading(true);
          let changedStatus = null;
          if (values.taskText === primaryText) {
            changedStatus = statusItems.find(
              (obj) => obj.status === values.status && !obj.isChanged,
            ).num;
          } else {
            changedStatus = statusItems.find(
              (obj) => obj.status === values.status && obj.isChanged,
            ).num;
          }

          let editedFormData = new FormData();
          editedFormData.set('text', values.taskText);
          editedFormData.set('status', changedStatus);
          editedFormData.set('token', localStorage.getItem('token'));

          axios
            .post(`/edit/${taskInfo.id}?developer=konstantin`, editedFormData)
            .then(({ data }) => {
              if (data.status === 'error') {
                setModalActive(true);
              } else {
                dispatch(fetchTasks(sortField, sortDirection, currentPage));
                onClose();
              }
              setIsLoading(false);
            });

          setSubmitting(false);
        }}>
        {({ isSubmitting, errors }) => (
          <Form className="task_form" noValidate>
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

            <div className="field">
              <label>Статус</label>
              <div role="group" aria-labelledby="my-radio-group" className="radio">
                <label>
                  <Field type="radio" name="status" value="Выполнена" />
                  Выполнена
                </label>
                <label>
                  <Field type="radio" name="status" value="Не выполнена" />
                  Не выполнена
                </label>
              </div>
            </div>

            <div className="compare_btn">
              <button type="submit" disabled={isSubmitting} className="btn">
                Сохранить
              </button>
              <button onClick={() => onClose()} className="btn">
                Отменить
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className={isLoading ? 'form_loading active' : 'form_loading'}>
        <LoopCircleLoading />
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <h2>Вы не авторизованы! ❌</h2>
        <button className="btn" onClick={() => onErrorAuth()}>
          ОК
        </button>
      </Modal>
    </div>
  );
};

export default EditTaskForm;
