import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'
import { RegisterPage, LoginPage, ForgotPage } from './components/Auth'
import Dashboard from './components/Dashboard'
import PublicProfile from './components/PublicProfile'
import Admin from './components/Admin'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot" element={<ForgotPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path=":username" element={<PublicProfile />} />
        <Route path="/:username" element={<PublicProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
