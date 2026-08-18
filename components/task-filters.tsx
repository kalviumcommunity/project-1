'use client'

import { cn } from '@/lib/utils'

export type Filter = 'all' | 'active' | 'completed'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

export function TaskFilters({
  current,
  onChange,
}: {
  current: Filter
  onChange: (filter: Filter) => void
}) {
  return (
    <div
      role="tablist"
      aria-label="Filter tasks"
      className="inline-flex items-center gap-1 rounded-lg bg-muted p-1"
    >
      {FILTERS.map((f) => (
        <button
          key={f.value}
          role="tab"
          aria-selected={current === f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            current === f.value
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
