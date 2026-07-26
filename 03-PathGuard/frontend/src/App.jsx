import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import { ToastContainer, toast } from 'react-toastify';
import Projects from './pages/Project/Projects';
import Notes from './pages/Notes/Notes';
import Profile from './pages/Profile/Profile';
import { Sidebar } from 'lucide-react';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';


const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>

        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path='/*' element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        } />

      </Routes >
    </>
  )
}

export default App