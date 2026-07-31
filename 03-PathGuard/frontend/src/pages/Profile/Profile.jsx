import React, { useState } from 'react'
import { Key, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext';


const Profile = () => {

  const { currentUser, displayName, setDisplayName } = useAuth();

  const { editProfileName
  } = useAuth();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await editProfileName(displayName)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ padding: '40px 24px', maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Key size={36} color="#06b6d4" />
          <span>Identity Profile</span>
        </h1>
        <p style={{ color: '#94a3b8', marginTop: '6px' }}>Manage your personal information and secure account settings.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
        {/* Left Side: General Profile Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Profile Card */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <User size={20} color="#8b5cf6" />
              <span>Identity Profile</span>
            </h2>

            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label className="form-label">Display Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Agent Name"
                  required
                />
              </div>

              <div className="form-group" style={{ opacity: 0.7 }}>
                <label className="form-label">Vault Email</label>
                <input
                  type="text"
                  className="form-input"
                  value={currentUser?.email || ''}
                  disabled
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Save Identity
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile