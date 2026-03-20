import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Login from './pages/Login'
import Home from './pages/Home'
import {Toaster} from "react-hot-toast"
import PrivateRoute from './components/ProtectedRoute'

const App = () => {
  const { state } = useContext(AuthContext);


  return (
    <>
      <Toaster/>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path='/login' element={<Login />} />

      </Routes>
    </>
  )
}

export default App