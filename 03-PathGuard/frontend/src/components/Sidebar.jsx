import React from 'react'
import { FolderKanban, FileText, User, LogOut, Lock, Globe, AlertTriangle } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation();

  const isRouteActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside className='sidebar'>
      {/* App Header */}
      <div className='sidebar-header'>
        <div className="auth-logo-wrapper" style={{ width: '40px', height: '40px', borderRadius: '10px' }}>
          <Lock size={20} color="#fff" />
        </div>
        <span className='sidebar-title'>PathGuard</span>
      </div>

      {/* Profile Card */}
      <div className="sidebar-profile">
        <div className="profile-info">
          <div className="profile-avatar">
            {/* Update Avator here */}
            P
          </div>
          <div className="profile-details">
            <span className="profile-name" title="">
              Priyesh
            </span>
            <span className="profile-email" title=''>
              hello@gmail.com
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className='sidebar-nav'>
        <NavLink
          to='/projects'
          className={({ isActive }) => `sidebar-link ${isActive || isRouteActive('/projects') ? "active" : ""}`}>
          <FolderKanban size={18} />
          <span>Projects</span>
        </NavLink>

        <NavLink 
          to="/notes" 
          className={({ isActive }) => `sidebar-link ${isActive || isRouteActive('/notes') ? 'active' : ''}`}
        >
          <FileText size={18} />
          <span>Notes</span>
        </NavLink>

        <NavLink
          to='profile'
          className={({ isActive }) => `sidebar-link ${isActive  ? "active" : ""}`}>
          <User size={18} />
          <span>Profile</span>
        </NavLink>


      </nav>
    </aside>
  )
}

export default Sidebar