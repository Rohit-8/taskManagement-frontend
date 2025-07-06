import { useNavigate } from 'react-router-dom';
import '../styling/Home.css';

function Home() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/tasks');
  }

  return (
    <div className="home-container">
      <h1>📘 Welcome to Task Manager</h1>
      <p>Keep track of daily tasks organized in single application.</p>
      <button className="navigate-button" onClick={handleClick}>
        View Tasks
      </button>
    </div>
  );
}

export default Home;
