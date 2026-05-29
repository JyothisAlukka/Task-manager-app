import { useState, useRef, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'

function getInitials(name) {
  return name ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : '?'
}

function Column({ col, tasks, onEdit, onDelete, onAdd, dragHandlers, onDragOver, onDrop, onDragLeave, isDragOver, showDrop }) {
  return (
    <div
      className={`col-wrap${isDragOver ? ' drag-over' : ''}`}
      onDragOver={e => { e.preventDefault(); onDragOver(col.key) }}
      onDrop={e => { e.preventDefault(); onDrop(col.key) }}
      onDragLeave={onDragLeave}
    >
      <div style={{
        fontSize: 12, fontWeight: 600, color: 'var(--muted)',
        letterSpacing: '0.05em', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12,
      }}>
        <span>{col.label}</span>
        <span className={`badge ${col.badgeClass}`}>{tasks.length}</span>
      </div>

      {showDrop && <div className="drop-indicator" />}

      {tasks.length === 0 && !showDrop && (
        <div style={{
          fontSize: 12, color: 'var(--muted)', textAlign: 'center',
          padding: '1.5rem 0', borderRadius: 8, border: '1px dashed var(--border)',
        }}>
          Drop tasks here
        </div>
      )}

      {tasks.map(t => (
        <TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} dragHandlers={dragHandlers} />
      ))}

      <button
        className="btn btn-ghost"
        style={{ width: '100%', justifyContent: 'center', marginTop: 8, fontSize: 12 }}
        onClick={() => onAdd(col.key)}
      >
        + Add
      </button>
    </div>
  )
}

export default function Board({ user, onLogout }) {
  const [tasks, setTasks] = useLocalStorage(`tm_tasks_${user.id}`, [])
  const [modal, setModal] = useState(null)
  const [search, setSearch] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [dragId, setDragId] = useState(null)
  const [dragOver, setDragOver] = useState(null)
  const dragNode = useRef(null)

  function saveTask(t) {
    if (t.id) setTasks(prev => prev.map(x => x.id === t.id ? t : x))
    else setTasks(prev => [...prev, { ...t, id: Date.now() }])
    setModal(null)
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(x => x.id !== id))
    setDeleteConfirm(null)
  }

  // Returns drag event handlers for each task card
  const dragHandlers = useCallback((task) => ({
    onDragStart: (e) => {
      setDragId(task.id)
      dragNode.current = e.currentTarget
      setTimeout(() => { if (dragNode.current) dragNode.current.classList.add('dragging') }, 0)
      e.dataTransfer.effectAllowed = 'move'
    },
    onDragEnd: () => {
      if (dragNode.current) dragNode.current.classList.remove('dragging')
      setDragId(null)
      setDragOver(null)
      dragNode.current = null
    },
  }), [])

  function handleDrop(stage) {
    const dragged = tasks.find(t => t.id === dragId)
    if (dragged && dragged.stage !== stage) {
      setTasks(prev => prev.map(t => t.id === dragId ? { ...t, stage, updatedAt: Date.now() } : t))
    }
    setDragId(null)
    setDragOver(null)
  }

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
    
  )
  const byStage = k => filtered.filter(t => t.stage === k)
  const done = tasks.filter(t => t.stage === 'done').length

  const cols = [
    { key: 'todo', label: 'Todo', badgeClass: 'badge-todo' },
    { key: 'progress', label: 'In Progress', badgeClass: 'badge-progress' },
    { key: 'done', label: 'Done', badgeClass: 'badge-done' },
  ]

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Nav */}
      <nav style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: '12px 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          <span style={{ fontSize: 16, fontWeight: 600 }}>Taskflow</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: 'var(--accent)' }}>
            {getInitials(user.name)}
          </div>
          <button className="btn btn-ghost" style={{ fontSize: 12, padding: '5px 11px' }} onClick={onLogout}>Sign out</button>
        </div>
      </nav>

      {/* Toolbar */}
      <div style={{ padding: '10px 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg)', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <input placeholder="Search tasks…" value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 250, margin: 0 }} />
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>{tasks.length} task{tasks.length !== 1 ? 's' : ''} · <span style={{ color: '#3B6D11' }}>{done} done</span></span>
        <button className="btn btn-primary" onClick={() => setModal({ stage: 'todo', createdAt: Date.now() })}>+ New task</button>
      </div>

      {/* Kanban */}
      <div style={{ display: 'flex', gap: 12, padding: '1rem 1.25rem', flex: 1, overflowX: 'auto', alignItems: 'flex-start' }}>
        {cols.map(col => (
          <Column
            key={col.key}
            col={col}
            tasks={byStage(col.key)}
            onEdit={setModal}
            onDelete={id => setDeleteConfirm(id)}
            onAdd={stage => setModal({ stage, createdAt: Date.now() })}
            dragHandlers={dragHandlers}
            onDragOver={setDragOver}
            onDrop={handleDrop}
            onDragLeave={() => setDragOver(null)}
            isDragOver={dragOver === col.key}
            showDrop={dragOver === col.key && dragId && tasks.find(t => t.id === dragId)?.stage !== col.key}
          />
        ))}
      </div>

      {modal && <TaskModal task={modal} onSave={saveTask} onClose={() => setModal(null)} />}

      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 320, padding: '1.5rem' }}>
            <p style={{ fontWeight: 500, marginBottom: 6 }}>Delete task?</p>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: '1.25rem' }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => deleteTask(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
