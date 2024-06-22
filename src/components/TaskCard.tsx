import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

const PRIORITY_COLORS = {
  low: '#64748b',
  medium: '#f59e0b',
  high: '#ef4444',
};

