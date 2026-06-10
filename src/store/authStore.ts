/**
 * Auth Store — реактивное состояние аутентификации.
 * Логин и пароль — из Vite ENV:
 *   VITE_AUTH_LOGIN=<личное>
 *   VITE_AUTH_PASSWORD=<личное>
 * Без .env — заглушка 'dev'/'dev'.
 */
import { createContext, useContext, useState, useCallback } from 'react'

export type LoginStep = 'idle' | 'login_ok' | 'authenticated' | 'error'

export interface AuthState {
  isAuthenticated: boolean
  loginStep: LoginStep
  login: (value: string) => boolean
  authenticate: (password: string) => boolean
  logout: () => void
}

const DEV_LOGIN    = import.meta.env.VITE_AUTH_LOGIN    ?? 'dev'
const DEV_PASSWORD = import.meta.env.VITE_AUTH_PASSWORD ?? 'dev'

/** Используется внутри AuthProvider — реактивный хук */
export function useAuthStore(): AuthState {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginStep, setLoginStep]             = useState<LoginStep>('idle')

  const login = useCallback((value: string): boolean => {
    if (value.trim().toLowerCase() === DEV_LOGIN.toLowerCase()) {
      setLoginStep('login_ok')
      return true
    }
    setLoginStep('error')
    return false
  }, [])

  const authenticate = useCallback((password: string): boolean => {
    if (password.trim().toLowerCase() === DEV_PASSWORD.toLowerCase()) {
      setIsAuthenticated(true)
      setLoginStep('authenticated')
      return true
    }
    setLoginStep('error')
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setLoginStep('idle')
  }, [])

  return { isAuthenticated, loginStep, login, authenticate, logout }
}

export const AuthContext = createContext<AuthState | null>(null)

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
