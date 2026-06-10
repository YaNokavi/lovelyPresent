/**
 * Auth Store — хранит состояние аутентификации в памяти (без localStorage).
 * Логин и пароль берутся из Vite ENV-переменных:
 *   VITE_AUTH_LOGIN=<что-то личное>
 *   VITE_AUTH_PASSWORD=<что-то личное>
 *
 * Если переменные не заданы — используются временные заглушки для разработки.
 */

import { createContext, useContext } from 'react'

export interface AuthState {
  isAuthenticated: boolean
  loginStep: 'idle' | 'login_ok' | 'authenticated' | 'error'
  login: (value: string) => boolean
  authenticate: (password: string) => boolean
  logout: () => void
}

const DEV_LOGIN    = import.meta.env.VITE_AUTH_LOGIN    ?? 'dev'
const DEV_PASSWORD = import.meta.env.VITE_AUTH_PASSWORD ?? 'dev'

export function createAuthStore(): AuthState {
  let isAuthenticated = false
  let loginStep: AuthState['loginStep'] = 'idle'

  return {
    get isAuthenticated() { return isAuthenticated },
    get loginStep() { return loginStep },

    login(value: string): boolean {
      if (value.trim().toLowerCase() === DEV_LOGIN.toLowerCase()) {
        loginStep = 'login_ok'
        return true
      }
      loginStep = 'error'
      return false
    },

    authenticate(password: string): boolean {
      if (password.trim().toLowerCase() === DEV_PASSWORD.toLowerCase()) {
        isAuthenticated = true
        loginStep = 'authenticated'
        return true
      }
      loginStep = 'error'
      return false
    },

    logout() {
      isAuthenticated = false
      loginStep = 'idle'
    },
  }
}

export const AuthContext = createContext<AuthState | null>(null)

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
