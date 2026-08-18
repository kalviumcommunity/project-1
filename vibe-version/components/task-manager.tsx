'use client'

import { useMemo, useState } from 'react'
import { TaskInput } from './task-input'
import { TaskFilters, type Filter } from './task-filters'
import { TaskItem } from './task-item'

export type Task = {
  id: string
  title: string
  completed: boolean
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Read the project brief', completed: true },
    { id: '2', title: 'Sketch the task list UI', completed: false },
    { id: '3', title: 'Ship the first version', completed: false },
  ])
  const [filter, setFilter] = useState<Filter>('all')

  function addTask(title: string) {
    const trimmed = title.trim()
    if (!trimmed) return
    setTasks((prev) => [
      { id: crypto.randomUUID(), title: trimmed, completed: false },
      ...prev,
    ])
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const visibleTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed)
    if (filter === 'completed') return tasks.filter((t) => t.completed)
    return tasks
  }, [tasks, filter])

  const activeCount = tasks.filter((t) => !t.completed).length

  return (
    <section className="w-full max-w-xl">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          Tasks
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {activeCount === 0
            ? 'All caught up. Nice work.'
            : `${activeCount} ${activeCount === 1 ? 'task' : 'tasks'} left to do`}
        </p>
      </header>

      <TaskInput onAdd={addTask} />

      <div className="mt-6 flex items-center justify-between gap-4">
        <TaskFilters current={filter} onChange={setFilter} />
        <span className="text-xs tabular-nums text-muted-foreground">
          {tasks.length} total
        </span>
      </div>

      <ul className="mt-4 flex flex-col gap-2" aria-label="Task list">
        {visibleTasks.length === 0 ? (
          <li className="rounded-lg border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
            {filter === 'completed'
              ? 'No completed tasks yet.'
              : filter === 'active'
                ? 'No active tasks. Add one above.'
                : 'No tasks yet. Add your first one above.'}
          </li>
        ) : (
          visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </ul>
    </section>
  )
}
