'use client'

import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { Plus } from 'lucide-react'

export function TaskInput({ onAdd }: { onAdd: (title: string) => void }) {
  const [value, setValue] = useState('')

  function submit() {
    if (!value.trim()) return
    onAdd(value)
    setValue('')
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    submit()
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    // Respect IME composition for CJK input
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    if (e.key === 'Enter') {
      e.preventDefault()
      submit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task…"
        aria-label="Task title"
        className="h-11 flex-1 rounded-lg border border-input bg-card px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="size-4" aria-hidden="true" />
        Add
      </button>
    </form>
  )
}
