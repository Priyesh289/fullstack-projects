import React from 'react'
import { FolderKanban, FileText, User, LogOut, Lock, Globe, AlertTriangle } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout, currentUser } = useAuth();


  const isRouteActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout()
  }
  const getUserInitial = () => {
    if (!currentUser) return "?";
    if (currentUser.name) return currentUser.name[0].toUpperCase();
    if (currentUser.email) return currentUser.email[0].toUpperCase()

  }
  const getUserDisplayName = () => {
    if (!currentUser) return "Loading...";
    return currentUser.name|| currentUser.email.split('@')[0];
  }


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
            {getUserInitial()}
          </div>
          <div className="profile-details">
            <span className="profile-name" title={getUserDisplayName()}>
              {getUserDisplayName()}
            </span>
            <span className="profile-email" title=''>
              {currentUser?.email}
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
          to='/profile'
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
          <User size={18} />
          <span>Profile</span>
        </NavLink>


      </nav>


      <div className='sidebar-footer'>
        <button onClick={handleLogout} className="btn btn-danger" style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 12px', fontSize: '1 rem' }}>
          <LogOut size={16} />
          <span>logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar