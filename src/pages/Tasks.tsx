import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskDetails from '../components/TaskDetails';
import FooterSummary from '../components/Footer';
import '../styling/Tasks.css';

function Tasks() {
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (task: any) => {
    setSelectedTask(task);
  };

  const handleCreate = () => {
    navigate('/tasks/create');
  };

  const handleSuccess = () => {
    setSelectedTask(null);
    setRefresh(r => !r);
  };

  return (
    <div className="tasks-page-wrapper">
      <div className="tasks-content">
        <div className="tasks-header-row">
          <button className="fancy-create-btn" onClick={handleCreate}>
            + Create Task
          </button>
        </div>
        {selectedTask && (
          <TaskDetails taskId={selectedTask.id} onClose={() => setSelectedTask(null)} />
        )}
        {!selectedTask && (
          <TaskList key={refresh ? '1' : '0'} onSelect={handleSelect} onEdit={() => {}} />
        )}
      </div>
      <FooterSummary />
    </div>
  );
}

export default Tasks;