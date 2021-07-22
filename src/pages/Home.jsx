import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/actions/tasks.js';

import { Pagination, SortPanel, Task, TaskForm } from '../components';
import Skeleton from 'react-loading-skeleton';

const Box = ({ children }) => (
  <div
    style={{
      marginBottom: 10,
    }}>
    {children}
  </div>
);

function Home() {
  const dispatch = useDispatch();
  const { items, sortField, sortDirection, currentPage, isLoading } = useSelector(
    ({ tasks }) => tasks,
  );

  useEffect(() => {
    dispatch(fetchTasks(sortField, sortDirection, currentPage));
  }, [currentPage, sortField, sortDirection]);

  return (
    <div className="home_content">
      <TaskForm />
      <div className="top_panel">
        <h2>Задачи</h2>
        <SortPanel />
      </div>

      <div className="tasks_list">
        {isLoading ? (
          <Skeleton wrapper={Box} count={3} height={290} />
        ) : items.length !== 0 ? (
          items.map((obj) => <Task key={obj.id} taskInfo={obj} />)
        ) : (
          'Нет задач'
        )}
      </div>
      <Pagination />
    </div>
  );
}

export default Home;
