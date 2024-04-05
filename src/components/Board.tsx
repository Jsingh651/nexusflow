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
    <div className="board">
      {columns.map((col) => (
        <ColumnComponent
          key={col.id}
          column={col}
          tasks={tasks.filter((t) => t.columnId === col.id)}
          onMove={onMove}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}











