import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from './TaskService';
import { useNavigate } from 'react-router-dom';
import '../styling/TaskForm.css';

interface TaskFormProps {
  initialTask?: any;
  onSuccess: () => void;
}

const emptyTask = {
  title: '',
  description: '',
  assignedBy: '',
  assignedTo: '',
  createdBy: '',
};

const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onSuccess }) => {
  const [task, setTask] = useState(initialTask || emptyTask);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem('userEmail') || '';

  useEffect(() => {
    setTask(initialTask || emptyTask);
  }, [initialTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (task.id) {
        await updateTask(task.id, task);
      } else {
        await createTask({ ...task, assignedBy: userEmail, createdBy: userEmail });
      }
      onSuccess();
      setTask(emptyTask);
      navigate('/tasks');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input name="title" value={task.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="description" value={task.description} onChange={handleChange} placeholder="Description" required />
      <input name="assignedBy" value={task.assignedBy} onChange={handleChange} placeholder="Assigned By" required />
      <input name="assignedTo" value={task.assignedTo} onChange={handleChange} placeholder="Assigned To" required />
      <div className="task-form-buttons">
        <button type="submit" disabled={loading}>{task.id ? 'Update' : 'Create'} Task</button>
        <button type="button" onClick={handleCancel} disabled={loading}>Cancel</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TaskForm;
