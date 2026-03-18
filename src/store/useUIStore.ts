import { create } from 'zustand'

export type Theme = 'dark' | 'light'

export interface Notification {
  id: number
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
  read: boolean
}

interface UIState {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  theme: Theme
  notifications: Notification[]
  unreadCount: number
}

interface UIActions {
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebarCollapse: () => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: number) => void
  markAllAsRead: () => void
  clearNotifications: () => void
}

type UIStore = UIState & UIActions

export const useUIStore = create<UIStore>()((set, get) => ({
  sidebarOpen: true,
  sidebarCollapsed: false,
  theme: 'dark',
  notifications: [],
  unreadCount: 0,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  toggleSidebarCollapse: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  
  setTheme: (theme) => set({ theme }),
  
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'dark' ? 'light' : 'dark' 
  })),

  addNotification: (notification) => set((state) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date(),
      read: false,
    }
    
    return {
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    }
  }),

  markAsRead: (id) => set((state) => {
    const notification = state.notifications.find(n => n.id === id)
    return {
      notifications: state.notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: notification && !notification.read 
        ? state.unreadCount - 1 
        : state.unreadCount
    }
  }),

  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0
  })),

  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}))

export default useUIStore
