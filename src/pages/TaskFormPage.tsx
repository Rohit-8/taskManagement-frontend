import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { getTaskById } from '../components/TaskService';

const TaskFormPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [task, setTask] = useState<any | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getTaskById(Number(id))
        .then(setTask)
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (id && !task) return <div>Task not found</div>;

  return (
    <div className="tasks-page-wrapper">
      <h2 className="task-form-title page-title">{id ? '📝 Update Task' : '🆕 Create Task'}</h2>
      <TaskForm initialTask={task} onSuccess={() => navigate('/tasks')} />
    </div>
  );
};

export default TaskFormPage;
