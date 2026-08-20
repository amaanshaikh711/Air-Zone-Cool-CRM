import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Trash2,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Task, Priority } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const TasksPage: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask, showToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: 'Super Admin',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    priority: 'Medium' as Priority,
  });

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addTask({
      title: formData.title,
      description: formData.description,
      assignedTo: formData.assignedTo,
      dueDate: formData.dueDate,
      priority: formData.priority,
      completed: false,
    });

    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      assignedTo: 'Super Admin',
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      priority: 'Medium',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Operational Task Board & Follow-ups
            </h1>
            <Badge variant="primary" size="sm">{tasks.filter(t => !t.completed).length} Pending</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Team action items, OEM spare parts procurement, client callbacks and site survey reminders
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
          }`}
        >
          All Tasks ({tasks.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
            filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
          }`}
        >
          Pending ({tasks.filter(t => !t.completed).length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
            filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
          }`}
        >
          Completed ({tasks.filter(t => t.completed).length})
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
              task.completed
                ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50 opacity-70'
                : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-2xs'
            }`}
          >
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-4 h-4 rounded mt-1 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <div className="space-y-1 min-w-0">
                <div className={`font-bold text-xs ${task.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-slate-100'}`}>
                  {task.title}
                </div>
                {task.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {task.description}
                  </p>
                )}
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span>Assigned: <strong className="text-slate-600 dark:text-slate-300">{task.assignedTo}</strong></span>
                  <span>Due: <strong className="text-slate-600 dark:text-slate-300">{task.dueDate}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Badge
                variant={
                  task.priority === 'Urgent' ? 'danger' :
                  task.priority === 'High' ? 'amber' : 'default'
                }
                size="sm"
              >
                {task.priority}
              </Badge>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
            No tasks found in this view.
          </div>
        )}
      </div>

      {/* CREATE TASK MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Team Task"
        subtitle="Assign an operational follow-up or procurement task"
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Task Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Order Daikin 1.5T Inverter PCB board"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Description / Notes</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed instructions..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Assigned To</label>
              <input
                type="text"
                value={formData.assignedTo}
                onChange={e => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Priority</label>
            <select
              value={formData.priority}
              onChange={e => setFormData(prev => ({ ...prev, priority: e.target.value as Priority }))}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent Emergency</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow"
            >
              Create Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
