import React, { useState } from 'react';

function TaskItem({ task, onDelete, onUpdate, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const handleSave = () => {
    onUpdate(task.id, { name: editedName });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${task.name}"?`);
    if (confirmDelete) {
      onDelete(task.id);
    }
  };

  return (
    <div className={`task-item ${task.is_completed ? 'completed' : ''}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <table>
            <tbody>
              <tr>
                <td><h3>{task.name}</h3></td>
                <td><p>Status: {task.is_completed ? '✅ Completed' : '❌ Not Completed'}</p></td>
                <td>
                  <button className="btn edit" onClick={() => setIsEditing(true)}>Edit</button>
                  <button
                    className="btn mark"
                    onClick={() => onToggleComplete(task.id, !task.is_completed)}
                  >
                    {task.is_completed ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                  <button className="btn delete" onClick={handleDeleteClick}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default TaskItem;
