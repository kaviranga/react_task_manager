import React from 'react';
import TaskItem from './TaskItem.jsx';

function TaskList({ tasks, onDelete, onUpdate, onToggleComplete }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onToggleComplete={onToggleComplete}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
