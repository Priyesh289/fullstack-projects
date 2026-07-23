import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'


const ProtectedRoute = () => {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to='/login' replce />
  }
  return (
    <>
      <Sidebar/>
      <Outlet />
    </>
  )
}

export default ProtectedRoute