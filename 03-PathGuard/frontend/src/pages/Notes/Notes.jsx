import React, { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'



const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);


  return (
    <div className="vault-split-layout">
      {/* Notes List Panel (Left) */}
      <div className="vault-list-panel">
        <div className="vault-list-header">
          <div className="vault-list-title-row">
            <span className="vault-list-title">Notes</span>
            <button
              //onClick={handleCreateNote}
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
            //onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* List Content */}
        <div className="vault-list-content">

        </div>
      </div>
    </div>
  )
}

export default Notes