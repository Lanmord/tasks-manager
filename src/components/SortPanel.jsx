import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTasks } from '../redux/actions/tasks.js';

const sortItems = [
  {
    name: 'имени пользователя',
    sort: 'username',
  },
  {
    name: 'email',
    sort: 'email',
  },
  {
    name: 'статусу',
    sort: 'status',
  },
];

function SortPanel() {
  const dispatch = useDispatch();
  const [sortDirection, setSortDirection] = useState(true);
  const [sortField, setSortField] = useState({
    name: 'имени пользователя',
    sort: 'username',
  });

  const selectSort = (sortObj) => {
    setSortField(sortObj);
    dispatch(setTasks({ sortField: sortObj.sort }));
  };

  const selectSortDirection = () => {
    setSortDirection(!sortDirection);
    dispatch(setTasks({ sortDirection: !sortDirection ? 'asc' : 'desc' }));
  };

  return (
    <div className="sort">
      <span>Сортировать по: </span>
      <div className="sort_items">
        {
          <ul>
            {sortItems
              .map((obj) => obj.name)
              .map((item) => (
                <li
                  key={item}
                  onClick={() => selectSort(sortItems.find((obj) => obj.name === item))}
                  className={sortField.name === item ? 'active' : ''}>
                  <span>{item}</span>
                </li>
              ))}
          </ul>
        }
      </div>
      <i
        onClick={() => selectSortDirection()}
        class={
          sortDirection
            ? 'lnr lnr-chevron-down sort_direction'
            : 'lnr lnr-chevron-up sort_direction'
        }></i>
    </div>
  );
}

export default SortPanel;
