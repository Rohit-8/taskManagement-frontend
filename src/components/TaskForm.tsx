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
  priority: '', // Add priority to emptyTask
  category: '', // Add category to emptyTask
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        required
        className={
          task.priority === 'HIGH'
            ? 'priority-high'
            : task.priority === 'MEDIUM'
            ? 'priority-medium'
            : task.priority === 'LOW'
            ? 'priority-low'
            : ''
        }
      >
        <option value="">Select Priority</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <select
        name="category"
        value={task.category}
        onChange={handleChange}
        required
        className={
          task.category === 'BUG'
            ? 'category-bug'
            : task.category === 'FEATURE'
            ? 'category-feature'
            : task.category === 'IMPROVEMENT'
            ? 'category-improvement'
            : task.category === 'RESEARCH'
            ? 'category-research'
            : ''
        }
        style={{
          padding: '0.5em 1em',
          borderRadius: '0.5em',
          border: '1px solid #ccc',
          fontWeight: 500,
          fontSize: '1em',
          marginBottom: '1em',
          background: '#f9f9f9',
          color: '#333',
        }}
      >
        <option value="">Select Category</option>
        <option value="BUG">🐞 Bug</option>
        <option value="FEATURE">✨ Feature</option>
        <option value="IMPROVEMENT">🔧 Improvement</option>
        <option value="RESEARCH">🔬 Research</option>
      </select>
      <div className="task-form-buttons">
        <button type="submit" disabled={loading}>{task.id ? 'Update' : 'Create'} Task</button>
        <button type="button" onClick={handleCancel} disabled={loading}>Cancel</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TaskForm;
