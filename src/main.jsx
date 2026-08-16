import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'  // ← ADD THIS
import './index.css'
import App from './App.jsx'
import CVPage from './CVPage.jsx'  // ← ADD THIS

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>           {/* ← WRAP WITH BrowserRouter */}
      <Routes>                {/* ← ADD ROUTES */}
        <Route path="/" element={<App />} />
        <Route path="/cv" element={<CVPage />} />  {/* ← CV ROUTE */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)