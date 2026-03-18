import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

interface AuthActions {
  setUser: (user: User | null) => void
  login: (credentials: { email: string; password: string }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      login: async (credentials) => {
        set({ loading: true })
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          
          const mockUser: User = {
            id: '1',
            name: 'Marco Campos',
            email: credentials.email,
            avatar: 'https://img.freepik.com/fotos-premium/hombre-guapo-joven-barba-sobre-aislado-manteniendo-brazos-cruzados-posicion-frontal_1368-132662.jpg?w=1380'
          }
          
          set({ user: mockUser, isAuthenticated: true, loading: false })
          return { success: true }
        } catch (error) {
          set({ loading: false })
          return { success: false, error: (error as Error).message }
        }
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)

export default useAuthStore
