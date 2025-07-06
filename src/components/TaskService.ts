// TaskService.ts
// Utility functions to interact with backend Task APIs

const API_BASE = process.env.REACT_APP_TASKS_URI + '/api/tasks';

export async function getAllTasks({ page = 0, size = 5, sortBy = 'title', sortDir = 'asc' } = {}) {
  const url = `${API_BASE}?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function getTaskById(id: number) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch task');
  return res.json();
}

export async function createTask(task: any) {
  const res = await fetch(`${API_BASE}/create-task`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

export async function updateTask(id: number, task: any) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

export async function deleteTask(id: number) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete task');
  return res.text();
}
