import './App.css';
import { TaskForm } from './components';

function App() {
  return (
    <div className="main_container">
      <header>HEader</header>
      <div className="content">
        <TaskForm />
        <div className="tasks_list">
          <div className="task"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
