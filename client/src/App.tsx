import React, { useState } from 'react';
import Create from './pages/Create';
import Read from './pages/Read';
import Update from './pages/Update';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  due_date: string;
}

const App = () => {
  const [view, setView] = useState<'home' | 'create' | 'read' | 'update'>('home');
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const searchTasks = async () => {
    const isNumeric = /^\d+$/.test(search);
    const url = isNumeric ? `/tasks/${search}` : `/tasks`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setTasks(isNumeric && !Array.isArray(data) ? [data] : data);
      setView('read');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Manager</h1>
      {view === 'home' && (
        <>
          <h2>Search Tasks</h2>
          <input
            placeholder="Search by ID or leave empty"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchTasks}>Search</button>
          <button onClick={() => setView('create')}>New</button>
        </>
      )}

      {view === 'create' && (
        <Create onClose={() => setView('home')} />
      )}

      {view === 'read' && (
        <Read
          tasks={tasks}
          onBack={() => setView('home')}
          onEdit={(task) => {
            setSelectedTask(task);
            setView('update');
          }}
          onDelete={async (id) => {
            await fetch(`/tasks/${id}`, { method: 'DELETE' });
            setTasks((prev) => prev.filter((t) => t.id !== id));
          }}
        />
      )}

      {view === 'update' && selectedTask && (
        <Update
          task={selectedTask}
          onClose={() => setView('home')}
        />
      )}
    </div>
  );
};

export default App;
