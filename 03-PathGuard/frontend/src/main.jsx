import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
import ProjectProvider from './context/ProjectContext.jsx'
import { NoteProvider } from './context/NoteContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ProjectProvider>
        <NoteProvider>
          <App />
        </NoteProvider>
      </ProjectProvider>
    </AuthProvider>
  </BrowserRouter>,
)
