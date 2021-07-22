import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setAuthStatus } from '../redux/actions/auth';
function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(({ auth }) => auth);

  const logOut = () => {
    localStorage.removeItem('token');
    dispatch(setAuthStatus(false));
  };
  return (
    <header>
      <Link to="/">
        <h1>TASK-MANAGER</h1>
      </Link>
      {location.pathname !== '/login' ? (
        isAuthenticated ? (
          <button onClick={() => logOut()} className="btn">
            Выйти
          </button>
        ) : (
          <Link to="/login">
            <button className="btn">Войти</button>
          </Link>
        )
      ) : (
        <Link to="/">
          <button className="btn">На главную</button>
        </Link>
      )}
    </header>
  );
}

export default Header;
