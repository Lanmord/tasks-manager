import './App.css';
import { Header } from './components';
import { Home, Authorization } from './pages';
import { Route } from 'react-router-dom';
import { setAuthStatus } from './redux/actions/auth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) dispatch(setAuthStatus(true));
  }, []);
  return (
    <div className="main_container">
      <Header />

      <Route path="/" component={Home} exact />
      <Route path="/login" component={Authorization} exact />
    </div>
  );
}

export default App;
