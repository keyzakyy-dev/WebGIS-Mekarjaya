import '@/styles/globals.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AppLayout from '@/layouts/AppLayout'
import Home from '@/pages/Home'
import MapPage from '@/pages/MapPage'
import Profile from '@/pages/Profile'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'
import { ThemeProvider } from '@/hooks/useTheme'

export default function App() {
  return (
    <ThemeProvider>
      <Router basename="/webgis-mekarjaya/">
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/peta" element={<MapPage />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/tentang" element={<About />} />
            <Route path="/kontak" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}