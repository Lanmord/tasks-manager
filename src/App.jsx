import './App.css';
import { Header } from './components';
import { Home, Authorization } from './pages';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="main_container">
      <Header />

      <Route path="/" component={Home} exact />
      <Route path="/login" component={Authorization} exact />
    </div>
  );
}

export default App;
