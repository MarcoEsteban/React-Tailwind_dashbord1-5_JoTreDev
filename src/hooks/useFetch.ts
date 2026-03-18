import { useState, useEffect, useCallback } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseFetchReturn<T> extends FetchState<T> {
  execute: (...args: unknown[]) => Promise<T | null>
  reset: () => void
  isIdle: boolean
  isSuccess: boolean
  isError: boolean
}

export const useFetch = <T,>(fetcher: (...args: unknown[]) => Promise<T>): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async (...args: unknown[]): Promise<T | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await fetcher(...args)
      setData(result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [fetcher])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    data,
    loading,
    error,
    execute,
    reset,
    isIdle: !loading && !error && !data,
    isSuccess: !loading && !error && data !== null,
    isError: error !== null
  }
}

export default useFetch
