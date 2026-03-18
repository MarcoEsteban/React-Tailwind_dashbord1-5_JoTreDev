import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'

const API_BASE = import.meta.env.VITE_API_URL || ''

interface ApiError {
  message: string
  status?: number
}

const fetchApi = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })
  
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }
  
  return response.json()
}

export interface Product {
  id: string | number
  name: string
  category: string
  stock: number
  price: number
  status: 'active' | 'out' | 'low'
}

export interface SalesData {
  period: string
  amount: number
}

export interface Stats {
  dailySales: number
  monthlyIncome: number
  newClients: number
  totalProducts: number
}

export const useProducts = (options?: UseQueryOptions<Product[], Error>) => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: () => fetchApi<Product[]>('/api/products'),
    ...options,
  })
}

export const useProduct = (id: string | number, options?: UseQueryOptions<Product, Error>) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => fetchApi<Product>(`/api/products/${id}`),
    enabled: !!id,
    ...options,
  })
}

export const useCreateProduct = (options?: UseMutationOptions<Product, Error, Partial<Product>>) => {
  const queryClient = useQueryClient()
  
  return useMutation<Product, Error, Partial<Product>>({
    mutationFn: (newProduct) => fetchApi<Product>('/api/products', {
      method: 'POST',
      body: JSON.stringify(newProduct),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    ...options,
  })
}

export const useUpdateProduct = (options?: UseMutationOptions<Product, Error, { id: string | number } & Partial<Product>>) => {
  const queryClient = useQueryClient()
  
  return useMutation<Product, Error, { id: string | number } & Partial<Product>>({
    mutationFn: ({ id, ...data }) => fetchApi<Product>(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] })
    },
    ...options,
  })
}

export const useDeleteProduct = (options?: UseMutationOptions<void, Error, string | number>) => {
  const queryClient = useQueryClient()
  
  return useMutation<void, Error, string | number>({
    mutationFn: (id) => fetchApi<void>(`/api/products/${id}`, {
      method: 'DELETE',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    ...options,
  })
}

export const useSales = (period: string = 'month', options?: UseQueryOptions<SalesData[], Error>) => {
  return useQuery<SalesData[], Error>({
    queryKey: ['sales', period],
    queryFn: () => fetchApi<SalesData[]>(`/api/sales?period=${period}`),
    ...options,
  })
}

export const useStats = (options?: UseQueryOptions<Stats, Error>) => {
  return useQuery<Stats, Error>({
    queryKey: ['stats'],
    queryFn: () => fetchApi<Stats>('/api/stats'),
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}
