import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  due_date: string;
}

interface Props {
  task: Task;
  onClose: () => void;
}

const Update = ({ task, onClose }: Props) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.due_date.slice(0, 16));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status, due_date: dueDate }),
      });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Update Task</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      <br />
      <input value={description} onChange={(e) => setDescription(e.target.value)} />
      <br />
      <input value={status} onChange={(e) => setStatus(e.target.value)} required />
      <br />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <br />
      <button type="submit">Update</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default Update;
