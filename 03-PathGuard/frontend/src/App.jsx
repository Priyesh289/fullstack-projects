import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import { ToastContainer, toast } from 'react-toastify';
import Projects from './pages/Project/Projects';
import Notes from './pages/Notes/Notes';
import Profile from './pages/User-Profile/Profile';
import { Sidebar } from 'lucide-react';
import ProtectedRoute from './routes/ProtectedRoute';


const App = () => {
  return (
    <>
      <ToastContainer />

      <Routes>

        <Route path="/" element={<Navigate to="/Signup" replace />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />} >
          <Route path="/projects" element={<Projects />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/profile' element={<Profile />} />
        </Route>



      </Routes >
    </>
  )
}

export default App