'use client'

import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Task } from './task-manager'

export function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <li className="group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
      <button
        role="checkbox"
        aria-checked={task.completed}
        aria-label={
          task.completed ? 'Mark task as active' : 'Mark task as completed'
        }
        onClick={() => onToggle(task.id)}
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors',
          task.completed
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-input hover:border-ring',
        )}
      >
        {task.completed && <Check className="size-3.5" aria-hidden="true" />}
      </button>

      <span
        className={cn(
          'flex-1 text-sm transition-colors',
          task.completed && 'text-muted-foreground line-through',
        )}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task: ${task.title}`}
        className="shrink-0 rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </li>
  )
}
