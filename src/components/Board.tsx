import type { Column, ColumnId, Task } from '../types';
import ColumnComponent from './Column';

interface BoardProps {
  columns: Column[];
  tasks: Task[];
  onMove: (taskId: string, columnId: ColumnId) => void;
  onDelete: (taskId: string) => void;
}

export default function Board({ columns, tasks, onMove, onDelete }: BoardProps) {
  return (
