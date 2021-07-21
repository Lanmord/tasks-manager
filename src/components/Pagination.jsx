import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks } from '../redux/actions/tasks.js';

function Pagination() {
  const dispatch = useDispatch();
  const { totalTaskCount, currentPage } = useSelector(({ tasks }) => tasks);
  const [minPageNumbers, setMinPageNumbers] = useState(1);
  const [maxPageNumbers, setMaxPageNumbers] = useState(6);

  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(totalTaskCount / 3); i++) {
    pageNumbers.push(i);
  }

  const increasePageNumbers = () => {
    setMaxPageNumbers(maxPageNumbers + 1);
    setMinPageNumbers(minPageNumbers + 1);
  };
  const decreasePageNumbers = () => {
    setMaxPageNumbers(maxPageNumbers - 1);
    setMinPageNumbers(minPageNumbers - 1);
  };

  const nextPage = () => {
    if (currentPage + 1 <= pageNumbers.length) {
      dispatch(setTasks({ currentPage: currentPage + 1 }));

      if (currentPage === maxPageNumbers && currentPage !== pageNumbers.length)
        increasePageNumbers();
    }
  };

  const previousPage = () => {
    if (currentPage - 1 >= 1) {
      dispatch(setTasks({ currentPage: currentPage - 1 }));

      if (currentPage === minPageNumbers && currentPage !== 1) decreasePageNumbers();
    }
  };

  const selectPage = (selectedPage) => {
    dispatch(setTasks({ currentPage: selectedPage }));
    if (selectedPage === maxPageNumbers && selectedPage !== pageNumbers.length) {
      increasePageNumbers();
    } else if (selectedPage === minPageNumbers && selectedPage !== 1) {
      decreasePageNumbers();
    }
  };

  const selectLastPage = () => {
    setMaxPageNumbers(pageNumbers.length);
    setMinPageNumbers(pageNumbers.length - 5);
    dispatch(setTasks({ currentPage: pageNumbers.length }));
  };

  const selectFirstPage = () => {
    setMaxPageNumbers(6);
    setMinPageNumbers(1);
    dispatch(setTasks({ currentPage: 1 }));
  };

  const renderPageNumbers = pageNumbers.map((page) => {
    if (page >= minPageNumbers && page <= maxPageNumbers) {
      return (
        <li
          key={page}
          className={page === currentPage ? 'page_btn active' : 'page_btn'}
          onClick={() => selectPage(page)}>
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <div className="pagination">
      <ul>
        <li onClick={selectFirstPage}>Первая</li>
        <li onClick={previousPage}>
          <span className="lnr lnr-chevron-left"></span>
        </li>
        {renderPageNumbers}
        <li onClick={nextPage}>
          <span className="lnr lnr-chevron-right"></span>
        </li>
        <li onClick={selectLastPage}>Последняя</li>
      </ul>
    </div>
  );
}

export default Pagination;
