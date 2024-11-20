import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import type { BoardState, ColumnId, Priority, Task } from '../types';

const STORAGE_KEY = 'nexusflow-board';

const DEFAULT_COLUMNS = [
  { id: 'backlog' as ColumnId, title: 'Backlog', color: '#6366f1' },
  { id: 'in-progress' as ColumnId, title: 'In Progress', color: '#f59e0b' },
  { id: 'review' as ColumnId, title: 'Review', color: '#8b5cf6' },
  { id: 'done' as ColumnId, title: 'Done', color: '#10b981' },
];

const SEED_TASKS: Task[] = [
  {
    id: uuid(),
    title: 'Design system tokens',
    description: 'Define color palette and typography scale',
    columnId: 'done',
    priority: 'high',
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: uuid(),
    title: 'API integration layer',
    description: 'Connect frontend to REST endpoints',
    columnId: 'in-progress',
    priority: 'high',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: uuid(),
    title: 'Write unit tests',
    description: 'Cover core board logic and hooks',
    columnId: 'backlog',
    priority: 'medium',
    createdAt: Date.now() - 86400000,
  },
];

function loadState(): BoardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* use defaults */
  }
  return { tasks: SEED_TASKS, columns: DEFAULT_COLUMNS };
}

function saveState(state: BoardState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useBoard() {
  const [state, setState] = useState<BoardState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const addTask = useCallback(
    (title: string, description: string, priority: Priority, columnId: ColumnId) => {
      const task: Task = {
        id: uuid(),
        title,
        description,
        columnId,
        priority,
        createdAt: Date.now(),
      };
      setState((s) => ({ ...s, tasks: [...s.tasks, task] }));
    },
    []
  );

  const moveTask = useCallback((taskId: string, columnId: ColumnId) => {
    setState((s) => ({
      ...s,
      tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, columnId } : t)),
    }));
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setState((s) => ({ ...s, tasks: s.tasks.filter((t) => t.id !== taskId) }));
  }, []);

