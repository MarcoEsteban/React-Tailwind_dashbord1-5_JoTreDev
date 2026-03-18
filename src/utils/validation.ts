import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingresa un email válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingresa un email válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .regex(/[A-Z]/, 'Debe tener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe tener al menos un número'),
  confirmPassword: z
    .string()
    .min(1, 'Confirma tu contraseña')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
})

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingresa un email válido')
})

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(200, 'El nombre no puede exceder 200 caracteres'),
  category: z
    .string()
    .min(1, 'La categoría es requerida'),
  stock: z
    .number()
    .min(0, 'El stock no puede ser negativo'),
  price: z
    .number()
    .positive('El precio debe ser mayor a 0')
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ProductInput = z.infer<typeof productSchema>

export const sanitizeInput = (input: unknown): unknown => {
  if (typeof input !== 'string') return input
  
  return input
    .replace(/[<>]/g, '')
    .trim()
}

export const sanitizeObject = <T extends Record<string, unknown>>(obj: T): T => {
  const sanitized: Record<string, unknown> = {}
  for (const key in obj) {
    sanitized[key] = sanitizeInput(obj[key])
  }
  return sanitized as T
}

export default {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  productSchema,
  sanitizeInput,
  sanitizeObject
}
