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
