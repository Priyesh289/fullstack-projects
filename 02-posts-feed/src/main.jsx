
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PostContextProvider from './context/PostContext.jsx'

createRoot(document.getElementById('root')).render(
  <PostContextProvider>
    <App />
  </PostContextProvider>,
)
