import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditTaskForm from './EditTaskForm';

const statusItems = [
  { num: 0, status: 'Задача не выполнена' },
  { num: 1, status: 'задача не выполнена, отредактирована админом' },
  { num: 10, status: 'задача выполнена' },
  { num: 11, status: 'задача отредактирована админом и выполнена' },
];

function Task({ taskInfo }) {
  const [activeChange, setActiveChange] = useState(false);
  const [visibleBtn, setVisibleBtn] = useState(false);
  const { isAuthenticated } = useSelector(({ auth }) => auth);

  const onChangeBtn = () => {
    setVisibleBtn(false);
    setActiveChange(true);
  };

  const onCloseBtn = () => {
    setVisibleBtn(true);
    setActiveChange(false);
  };

  const hideChangeFields = () => {
    setVisibleBtn(false);
    setActiveChange(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setVisibleBtn(true);
    } else {
      hideChangeFields();
    }
  }, [isAuthenticated]);
  return (
    <div className="task">
      <span className="task_label">Имя пользователя</span>
      <p className="task_field">{taskInfo.username}</p>

      <span className="task_label">E-mail</span>
      <p className="task_field">{taskInfo.email}</p>
      {!activeChange ? (
        <>
          <span className="task_label">Текст задачи</span>
          <p className="task_field">{taskInfo.text}</p>

          <span className="task_label">Статус</span>
          <p className="task_field">
            {statusItems.find((obj) => obj.num === taskInfo.status).status}
          </p>
        </>
      ) : (
        <EditTaskForm
          taskInfo={taskInfo}
          onClose={onCloseBtn}
          hideChangeFields={hideChangeFields}
        />
      )}

      {visibleBtn ? (
        <button onClick={() => onChangeBtn()} className="btn btn-change">
          Изменить
        </button>
      ) : null}
    </div>
  );
}

export default Task;
