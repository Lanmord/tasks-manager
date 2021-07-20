import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const TaskForm = () => (
  <div>
    <h1>Создать задачу</h1>
    <Formik
      initialValues={{ email: '', username: '', taskText: '', taskStatus: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        let taskFormData = new FormData();

        taskFormData.set('email', values.email);
        taskFormData.set('username', values.username);
        taskFormData.set('text', values.taskText);
        taskFormData.set('status', values.taskStatus);

        axios.post('/create?developer=konstantin', taskFormData).then((res) => {
          console.log(res.data);
        });

        setSubmitting(false);
      }}>
      {({ isSubmitting }) => (
        <Form className="task_form">
          <label htmlFor="email">E-mail</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />

          <label htmlFor="username">Имя пользователя</label>
          <Field type="text" name="username" />
          <ErrorMessage name="username" component="div" />

          <label htmlFor="taskText">Задача</label>
          <Field type="text" name="taskText" />
          <ErrorMessage name="taskText" component="div" />

          <label htmlFor="taskStatus">Статус</label>
          <Field type="text" name="taskStatus" />
          <ErrorMessage name="taskStatus" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default TaskForm;
