import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'


const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to='/login' replace />
  }

  return children;
}

export default ProtectedRoute