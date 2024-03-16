import { useState } from 'react';
import { useBoard } from './hooks/useBoard';
import Board from './components/Board';
import TaskModal from './components/TaskModal';
import type { ColumnId, Priority } from './types';

export default function App() {
  const board = useBoard();
  const [modalOpen, setModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleAdd = (title: string, desc: string, priority: Priority, column: ColumnId) => {
    board.addTask(title, desc, priority, column);
    setModalOpen(false);
  };

  const stats = {
    total: board.tasks.length,
    done: board.tasks.filter((t) => t.columnId === 'done').length,
    active: board.tasks.filter((t) => t.columnId === 'in-progress').length,
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <div className="brand">
          <span className="brand-icon">⬡</span>
          <div>
            <h1>NexusFlow</h1>
            <p className="tagline">Project workflow, simplified</p>
          </div>
        </div>
        <div className="header-actions">
          <div className="stats">
            <span>{stats.total} tasks</span>
            <span className="divider">·</span>
            <span>{stats.active} active</span>
            <span className="divider">·</span>
            <span>{stats.done} done</span>
          </div>
          <button className="btn-icon" onClick={() => setDarkMode(!darkMode)} title="Toggle theme">
            {darkMode ? '☀' : '☾'}
          </button>
          <button className="btn-primary" onClick={() => setModalOpen(true)}>
            + New Task
          </button>
        </div>
      </header>

      <Board
        columns={board.columns}
        tasks={board.tasks}
        onMove={board.moveTask}
        onDelete={board.deleteTask}
      />

      {modalOpen && (
        <TaskModal onClose={() => setModalOpen(false)} onSubmit={handleAdd} />
      )}
    </div>
