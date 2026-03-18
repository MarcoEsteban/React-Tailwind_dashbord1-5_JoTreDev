import { useState, useCallback } from 'react'

interface UseErrorBoundaryReturn {
  error: Error | null
  throwError: (error: Error) => void
  clearError: () => void
  hasError: boolean
}

export const useErrorBoundary = (): UseErrorBoundaryReturn => {
  const [error, setError] = useState<Error | null>(null)

  const throwError = useCallback((err: Error) => {
    setError(err)
    throw err
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    error,
    throwError,
    clearError,
    hasError: error !== null
  }
}

export default useErrorBoundary
