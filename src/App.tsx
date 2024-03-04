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
