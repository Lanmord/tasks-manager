import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
function Header() {
  const location = useLocation();
  const history = useHistory();
  const logOut = () => {
    history.push('/');
    localStorage.removeItem('token');
  };
  return (
    <header>
      <Link to="/">
        <h1>TASK-MANAGER</h1>
      </Link>
      {location.pathname !== '/login' ? (
        localStorage.getItem('token') ? (
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
