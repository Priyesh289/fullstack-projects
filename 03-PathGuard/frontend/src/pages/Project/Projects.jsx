
import { Plus, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'


const Projects = () => {
  const [search, setSearch] = useState('');

  const handleCreateProject = () => {
    //logic
  }

  return (
    <div className="vault-split-layout">
      {/* Project List Panel (left) */}
      <div className='vault-list-panel'>
        <div className="vault-list-header">
          <div className="vault-list-title-row">
            <span className="vault-list-title">Projects</span>
            <button
              onClick={handleCreateProject}
              className="btn btn-primary btn-icon"
              title="Create Security Project"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="form-input search-input"
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* List Content */}
        <div className="vault-list-content">

        </div>

      </div>
      {/* Detail Panel (right) - Renders nested route */}
      <div className='vault-detail-panel'>
        <Outlet />
      </div>
    </div>







  )
}

export default Projects