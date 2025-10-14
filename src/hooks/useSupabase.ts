import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { User, Session, AuthError } from '@supabase/supabase-js'

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: AuthError | null
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    // Get current session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
          error
        })
      } catch (error) {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: error as AuthError
        }))
      }
    }

    getInitialSession()

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
          error: null
        })
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    return { data, error }
  }

  return {
    ...authState,
    signUp,
    signIn,
    signOut,
    resetPassword
  }
}

// Hook for working with data
export const useSupabase = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const fetchData = async <T>(
    table: string,
    options?: {
      select?: string
      filters?: Record<string, any>
      orderBy?: { column: string; ascending?: boolean }
      limit?: number
    }
  ) => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase.from(table).select(options?.select || '*')

      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
      }

      if (options?.orderBy) {
        query = query.order(options.orderBy.column, { 
          ascending: options.orderBy.ascending ?? true 
        })
      }

      if (options?.limit) {
        query = query.limit(options.limit)
      }

      const { data, error } = await query

      if (error) throw error

      return data as T[]
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const insertData = async <T>(table: string, data: Partial<T>) => {
    setLoading(true)
    setError(null)

    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()

      if (error) throw error

      return result as T[]
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateData = async <T>(
    table: string, 
    id: string | number, 
    data: Partial<T>
  ) => {
    setLoading(true)
    setError(null)

    try {
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()

      if (error) throw error

      return result as T[]
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteData = async (table: string, id: string | number) => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)

      if (error) throw error

      return true
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    fetchData,
    insertData,
    updateData,
    deleteData
  }
}
