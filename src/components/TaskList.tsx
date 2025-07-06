import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTasks, deleteTask } from './TaskService';

interface Task {
  id: number;
  title: string;
  description: string;
  assignedBy: string;
  assignedTo: string;
  createdAt: string;
  priority: string;
}

interface Props {
  onSelect: (task: Task) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<Props> = ({ onSelect, onEdit }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof Task>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const tasksPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAllTasks({
      page: currentPage - 1,
      size: tasksPerPage,
      sortBy: sortKey,
      sortDir: sortOrder,
    })
      .then((data) => {
        setTasks(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [currentPage, sortKey, sortOrder]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this task?')) return;
    await deleteTask(id);
    
    setLoading(true);
    getAllTasks({
      page: currentPage - 1,
      size: tasksPerPage,
      sortBy: sortKey,
      sortDir: sortOrder,
    })
      .then((data) => {
        setTasks(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  const handleSort = (key: keyof Task) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="task-table-responsive">
      <table className="task-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('title')} style={{cursor: 'pointer'}}>
              Title {sortKey === 'title' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('description')} style={{cursor: 'pointer'}}>
              Description {sortKey === 'description' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('assignedBy')} style={{cursor: 'pointer'}}>
              Assigned By {sortKey === 'assignedBy' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('assignedTo')} style={{cursor: 'pointer'}}>
              Assigned To {sortKey === 'assignedTo' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('createdAt')} style={{cursor: 'pointer'}}>
              Created At {sortKey === 'createdAt' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('priority')} style={{cursor: 'pointer'}}>
              Priority {sortKey === 'priority' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.assignedBy}</td>
              <td>{task.assignedTo}</td>
              <td>{new Date(task.createdAt).toLocaleString()}</td>
              <td>{task.priority}</td>
              <td className="task-actions">
                <button className="fancy-btn view-btn" onClick={() => onSelect(task)}>View</button>
                <button className="fancy-btn edit-btn" onClick={() => navigate(`/tasks/update/${task.id}`)}>Edit</button>
                <button className="fancy-btn delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`pagination-btn${currentPage === i + 1 ? ' active' : ''}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
      <div style={{marginTop: 8, fontSize: 12}}>
        Showing {tasks.length} of {totalElements} tasks
      </div>
    </div>
  );
};

export default TaskList;
