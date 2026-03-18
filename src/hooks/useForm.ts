import { useState, useCallback } from 'react'
import { ZodSchema } from 'zod'

export interface UseFormOptions<T> {
  initialValues: T
  validateOnChange?: boolean
}

export interface UseFormReturn<T> {
  values: T
  errors: Record<string, string>
  touched: Record<string, boolean>
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  setFieldValue: (name: keyof T, value: string) => void
  setFieldError: (name: keyof T, error: string) => void
  resetForm: () => void
  validate: (schema: ZodSchema) => boolean
  isValid: boolean
}

export const useForm = <T extends Record<string, string>>(
  options: UseFormOptions<T>
): UseFormReturn<T> => {
  const { initialValues, validateOnChange = true } = options
  
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    
    if (validateOnChange && errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }, [validateOnChange, errors])

  const handleBlur = useCallback((
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
  }, [])

  const setFieldValue = useCallback((name: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }))
  }, [])

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [])

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  const validate = useCallback((schema: ZodSchema): boolean => {
    try {
      schema.parse(values)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof Error && 'errors' in error) {
        const zodError = error as { errors: { path: [string]; message: string }[] }
        const newErrors: Record<string, string> = {}
        zodError.errors.forEach(err => {
          newErrors[err.path[0]] = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }, [values])

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    resetForm,
    validate,
    isValid: Object.keys(errors).length === 0
  }
}

export default useForm
