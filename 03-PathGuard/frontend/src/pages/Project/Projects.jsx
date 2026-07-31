import { Link, useNavigate } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useProject } from '../../context/ProjectContext'


const Projects = () => {

  const { projects, loading, copyProjectId } = useProject();
  const [search, setSearch] = useState('');
  const navigate = useNavigate()

  const handleCreateProject = () => {
    navigate("/projects/new");
  }

  // Filter projects by title search
  const filteredProjects = projects.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  );



  const getTaskProgress = (tasks) => {
    if (!tasks) return { total: 0, completed: 0, percent: 0 };
    const taskList = Object.values(tasks);
    const total = taskList.length;
    const completed = taskList.filter((t) => t.completed).length;
    return {
      total,
      completed,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0

    };
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
              placeholder="Search Projects..."
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
          ) : (
            filteredProjects.map((p) => {
              const progress = getTaskProgress(p.tasks);
              const isActive = p._id === copyProjectId;

              return (
                <Link
                  key={p._id}
                  to={`/projects/${p._id}`}
                  className={`glass-card vault-item-card ${isActive ? 'active' : ''}`}
                >
                  <span className="vault-item-card-title">{p.title || 'Untitled Project'}</span>
                  <p className="vault-item-card-desc">{p.description || 'No description provided.'}</p>

                  <div className="vault-item-card-footer">
                    <span className={`badge badge-${p.status}`}>
                      {p.status}
                    </span>

                    {progress.total > 0 && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                        {progress.completed}/{progress.total} Tasks ({progress.percent}%)
                      </span>
                    )}
                  </div>
                </Link>
              )
            })
          )}
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