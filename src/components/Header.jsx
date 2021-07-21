import React from 'react';
import { Link, useLocation } from 'react-router-dom';
function Header() {
  const location = useLocation();
  return (
    <header>
      <Link to="/">
        <h1>TASK-MANAGER</h1>
      </Link>
      {location.pathname !== '/login' ? (
        <Link to="/login">
          <button className="btn">Войти</button>
        </Link>
      ) : (
        <Link to="/">
          <button className="btn">На главную</button>
        </Link>
      )}
    </header>
  );
}

export default Header;
