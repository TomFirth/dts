import React, { useState } from 'react';

interface Props {
  onClose: () => void;
}

const Create = ({ onClose }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/tasks', {
        method: 'POST',
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
      <h2>Create Task</h2>
      <input
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <input
        placeholder="Status"
        value={status}
        required
        onChange={(e) => setStatus(e.target.value)}
      />
      <br />
      <input
        type="datetime-local"
        value={dueDate}
        required
        onChange={(e) => setDueDate(e.target.value)}
      />
      <br />
      <button type="submit">Create</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default Create;
