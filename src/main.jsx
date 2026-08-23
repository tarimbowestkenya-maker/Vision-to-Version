import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'  // ← ADD THIS
import './index.css'
import App from './App.jsx'
import CVPage from './CVPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>          {/* ← WRAP WITH HelmetProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cv" element={<CVPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)