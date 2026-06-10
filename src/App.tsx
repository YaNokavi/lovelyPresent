import { useState, useMemo } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { AuthContext, createAuthStore, useAuth } from './store/authStore'
import AuthScreen  from './components/auth/AuthScreen'
import Home        from './components/pages/Home'
import OurJourney from './components/pages/OurJourney'
import Gallery    from './components/pages/Gallery'
import Letters    from './components/pages/Letters'
import AboutUs    from './components/pages/AboutUs'

/* Анимация смены страниц */
const pageVariants = {
  initial:  { opacity: 0, y: 12 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

function AnimatedRoutes() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ minHeight: '100dvh' }}
      >
        <Routes location={location}>
          {/* Auth gate */}
          <Route
            path="/"
            element={
              isAuthenticated
                ? <Navigate to="/home" replace />
                : <AuthScreen />
            }
          />

          {/* Protected routes */}
          {isAuthenticated ? (
            <>
              <Route path="/home"        element={<Home />} />
              <Route path="/our-journey" element={<OurJourney />} />
              <Route path="/gallery"     element={<Gallery />} />
              <Route path="/letters"     element={<Letters />} />
              <Route path="/about-us"    element={<AboutUs />} />
              <Route path="*"            element={<Navigate to="/home" replace />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const auth = useMemo(() => createAuthStore(), [])

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
