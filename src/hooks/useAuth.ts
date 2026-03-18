import { useState, useEffect, useCallback, useMemo } from 'react'

interface StoredUser {
  id: string
  name: string
  email: string
  avatar?: string
}

const STORAGE_KEY = 'auth_user'

export const useAuth = () => {
  const [user, setUser] = useState<StoredUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY)
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as StoredUser
        setUser(parsed)
        setIsAuthenticated(true)
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email: string, _password: string) => {
    setLoading(true)
    try {
      const mockUser: StoredUser = {
        id: '1',
        name: 'Marco Campos',
        email,
        avatar: 'https://img.freepik.com/fotos-premium/hombre-guapo-joven-barba-sobre-aislado-manteniendo-brazos-cruzados-posicion-frontal_1368-132662.jpg?w=1380'
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser))
      setUser(mockUser)
      setIsAuthenticated(true)
      return { success: true }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const updateUser = useCallback((updates: Partial<StoredUser>) => {
    if (!user) return
    const updatedUser = { ...user, ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser))
    setUser(updatedUser)
  }, [user])

  return useMemo(() => ({
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser
  }), [user, loading, isAuthenticated, login, logout, updateUser])
}

export default useAuth
