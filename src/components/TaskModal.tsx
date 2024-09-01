import { useState } from 'react';
import type { ColumnId, Priority } from '../types';

interface TaskModalProps {
  onClose: () => void;
  onSubmit: (title: string, desc: string, priority: Priority, column: ColumnId) => void;
}

export default function TaskModal({ onClose, onSubmit }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [column, setColumn] = useState<ColumnId>('backlog');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title.trim(), description.trim(), priority, column);
  };

