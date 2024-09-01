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

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="task-card" draggable onDragStart={handleDragStart}>
      <div className="task-header">
        <span
          className="priority-badge"
          style={{ background: PRIORITY_COLORS[task.priority] }}
        >
          {task.priority}
        </span>
        <button className="btn-delete" onClick={() => onDelete(task.id)} title="Delete">
          ×
        </button>
      </div>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
    </div>
  );
}















