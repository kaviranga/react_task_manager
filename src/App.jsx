import './App.css';
import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data.data); // Laravel API resource wraps data in 'data'
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (task) => {
    try {
      const res = await axios.post(API_URL, task);
      setTasks([...tasks, res.data.data]);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedData);
      setTasks(tasks.map((t) => (t.id === id ? res.data.data : t)));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleToggleComplete = async (id, isCompleted) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}/complete`, {
        is_completed: isCompleted,
      });
      setTasks(tasks.map((t) => (t.id === id ? res.data.data : t)));
    } catch (error) {
      console.error('Failed to toggle complete:', error);
    }
  };

  return (
    <div className="container">
      <h2>Task Manager</h2>
      <TaskForm onAdd={handleAdd} />
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}

export default App;
