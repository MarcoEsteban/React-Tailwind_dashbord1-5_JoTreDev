import { create } from 'zustand'

export interface Product {
  id: string | number
  name: string
  price: number
  image?: string
  category?: string
}

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

interface CartActions {
  addItem: (product: Product) => void
  removeItem: (productId: string | number) => void
  updateQuantity: (productId: string | number, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

type CartStore = CartState & CartActions

export const useCartStore = create<CartStore>()((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id)
    
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
    }
    
    return {
      items: [...state.items, { ...product, quantity: 1 }]
    }
  }),

  removeItem: (productId) => set((state) => ({
    items: state.items.filter(item => item.id !== productId)
  })),

  updateQuantity: (productId, quantity) => set((state) => {
    if (quantity <= 0) {
      return {
        items: state.items.filter(item => item.id !== productId)
      }
    }
    
    return {
      items: state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    }
  }),

  clearCart: () => set({ items: [] }),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
  
  getTotalPrice: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
}))

export default useCartStore
