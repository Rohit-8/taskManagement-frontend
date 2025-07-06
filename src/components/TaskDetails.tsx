import React, { useEffect, useState } from 'react';
import { getTaskById } from './TaskService';
import '../styling/TaskDetails.css';

interface TaskDetailsProps {
  taskId: number;
  onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ taskId, onClose }) => {
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTaskById(taskId)
      .then(setTask)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [taskId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!task) return <div>No task found.</div>;

  return (
    <div className="task-details">
      <h3>{task.title || ''}</h3>
      <p><strong>Description:</strong> {task.description || ''}</p>
      <p><strong>Assigned By:</strong> {task.assignedBy || ''}</p>
      <p><strong>Assigned To:</strong> {task.assignedTo || ''}</p>
      <p><strong>Created At:</strong> {task.createdAt ? new Date(task.createdAt).toLocaleString() : ''}</p>
      <p><strong>Created By:</strong> {task.createdBy || ''}</p>
      <p><strong>Priority:</strong> {task.priority ? (task.priority.charAt(0) + task.priority.slice(1).toLowerCase()) : ''}</p>
      <p><strong>Category:</strong> {task.category ? (task.category.charAt(0) + task.category.slice(1).toLowerCase()) : ''}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TaskDetails;
