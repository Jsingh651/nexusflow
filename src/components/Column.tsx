import { useState } from 'react';
import type { Column as ColumnType, ColumnId, Task } from '../types';
import TaskCard from './TaskCard';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onMove: (taskId: string, columnId: ColumnId) => void;
  onDelete: (taskId: string) => void;
}

export default function Column({ column, tasks, onMove, onDelete }: ColumnProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) onMove(taskId, column.id);
  };

  return (
    <div
      className={`column ${dragOver ? 'drag-over' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <span className="column-dot" style={{ background: column.color }} />
        <h2>{column.title}</h2>
        <span className="column-count">{tasks.length}</span>
      </div>
      <div className="column-tasks">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}











