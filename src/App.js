import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Tasks from './pages/Tasks.tsx';
import Layout from './components/Layout.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import TaskFormPage from './pages/TaskFormPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/create" element={<TaskFormPage />} />
          <Route path="/tasks/update/:id" element={<TaskFormPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
