import React from 'react';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  due_date: string;
}

interface Props {
  tasks: Task[];
  onBack: () => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const Read = ({ tasks, onBack, onEdit, onDelete }: Props) => {
  return (
    <div>
      <h2>Search Results</h2>
      <button onClick={onBack}>Back</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.status} - due: {new Date(task.due_date).toLocaleString()}
            <button onClick={() => onEdit(task)}>Update</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Read;
