import React, { useState } from 'react'
import { Plus, Search, FileX, LogIn } from 'lucide-react'
import { useNavigate, Outlet,Link } from 'react-router-dom'
import { useNotes } from '../../context/NoteContext';



const Notes = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);


  const { createNotes, notes, setNotes,
    copyNoteId } = useNotes();

  const navigate = useNavigate();


  const handleCreateNote = async () => {
    const createNote = await createNotes();

    if (createNote) {
      navigate(`/notes/${createNote._id}`)

    }
  }


  const filteredNotes = notes.filter(n =>
    n.title?.toLowerCase().includes(search.toLowerCase()) ||
    n.body?.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="vault-split-layout">
      {/* Notes List Panel (Left) */}
      <div className="vault-list-panel">
        <div className="vault-list-header">
          <div className="vault-list-title-row">
            <span className="vault-list-title">Notes</span>
            <button
              onClick={handleCreateNote}
              className="btn btn-primary btn-icon"
              title="Create Security Note"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="form-input search-input"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* List Content */}
        <div className="vault-list-content">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
              <div className="spinner"></div>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <FileX size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
              <p style={{ fontSize: '0.9rem' }}>No notes found</p>
            </div>
          ) : (
            filteredNotes.map((n) => {
              const isActive = n._id === copyNoteId;
              return (
                <Link
                  key={n._id}
                  to={`/notes/${n._id}`}
                  className={`glass-card vault-item-card ${isActive ? 'active' : ''}`}
                  style={{
                    borderLeft: `4px solid ${n.color || 'var(--accent-cyan)'}`
                  }}
                >
                  <span className="vault-item-card-title">{n.title || 'Untitled Note'}</span>
                  <p className="vault-item-card-desc">{n.body || 'Empty note content.'}</p>

                  <div className="vault-item-card-footer">
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                      {n.category || 'General'}
                    </span>
                    <span>
                      {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>

      {/* Note Editor Panel (Right Sub-Route) */}
      <div className="vault-detail-panel">
        <Outlet />
      </div>
    </div>
  )
}

export default Notes