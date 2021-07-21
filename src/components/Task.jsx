import React from 'react';

function Task({ taskInfo }) {
  return (
    <div className="task">
      <span className="task_label">Имя пользователя</span>
      <p className="task_field">{taskInfo.username}</p>

      <span className="task_label">E-mail</span>
      <p className="task_field">{taskInfo.email}</p>

      <span className="task_label">Текст задачи</span>
      <p className="task_field">{taskInfo.text}</p>

      <span className="task_label">Статус</span>
      <p className="task_field">{taskInfo.status}</p>
    </div>
  );
}

export default Task;
