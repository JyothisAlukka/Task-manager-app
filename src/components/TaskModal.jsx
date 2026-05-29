import { useState } from 'react'

export default function TaskModal({ task, onSave, onClose }) {
  const [title, setTitle] = useState(task?.title || '')
  const [desc, setDesc] = useState(task?.desc || '')
  const [stage, setStage] = useState(task?.stage || 'todo')
  const [err, setErr] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!title.trim()) { setErr('Title is required'); return }
    onSave({ ...task, title: title.trim(), desc: desc.trim(), stage, updatedAt: Date.now() })
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '420px', padding: '1.5rem', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 500 }}>{task?.id ? 'Edit task' : 'New task'}</h3>
          <button className="btn btn-ghost" style={{ padding: '4px 10px' }} onClick={onClose}>✕</button>
        </div>

        {err && <div className="err">{err}</div>}

        <form onSubmit={submit}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--muted)', display: 'block', marginBottom: '4px' }}>Title</label>
            <input placeholder="What needs to be done?" value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--muted)', display: 'block', marginBottom: '4px' }}>Description (optional)</label>
            <textarea placeholder="Add more context…" value={desc} onChange={e => setDesc(e.target.value)} rows={3} style={{ resize: 'vertical' }} />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--muted)', display: 'block', marginBottom: '4px' }}>Stage</label>
            <select value={stage} onChange={e => setStage(e.target.value)}>
              <option value="todo">Todo</option>
              <option value="progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button className="btn btn-ghost" type="button" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" type="submit">{task?.id ? 'Save changes' : 'Create task'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
