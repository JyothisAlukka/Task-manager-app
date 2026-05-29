export default function TaskCard({ task, onEdit, onDelete, dragHandlers }) {
  const date = new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <div
      className="task-card"
      draggable
      {...dragHandlers(task)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flex: 1 }}>
          <span style={{ fontSize: 16, color: 'var(--muted)', marginTop: 1, cursor: 'grab', flexShrink: 0 }}>⠿</span>
          <p style={{
            fontSize: 14, fontWeight: 500, lineHeight: 1.45, flex: 1,
            textDecoration: task.stage === 'done' ? 'line-through' : 'none',
            opacity: task.stage === 'done' ? 0.55 : 1,
          }}>
            {task.title}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          <button className="btn btn-ghost" style={{ padding: '3px 8px', fontSize: 12 }}
            onClick={e => { e.stopPropagation(); onEdit(task) }}>✎</button>
          <button className="btn btn-ghost" style={{ padding: '3px 8px', fontSize: 12, color: 'var(--danger)' }}
            onClick={e => { e.stopPropagation(); onDelete(task.id) }}>✕</button>
        </div>
      </div>

      {task.desc && (
        <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, lineHeight: 1.5, paddingLeft: 24 }}>
          {task.desc}
        </p>
      )}

      <div style={{ paddingLeft: 24 }}>
        <span style={{ fontSize: 11, color: 'var(--muted)' }}>{date}</span>
      </div>
    </div>
  )
}
