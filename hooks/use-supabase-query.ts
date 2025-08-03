import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/auth-context'

interface UseSupabaseQueryOptions {
  enabled?: boolean
  refetchOnMount?: boolean
}

export function useSupabaseQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  dependencies: any[] = [],
  options: UseSupabaseQueryOptions = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const { profile } = useAuth()

  const { enabled = true, refetchOnMount = true } = options

  const refetch = async () => {
    if (!enabled || !profile) return

    try {
      setLoading(true)
      setError(null)
      const result = await queryFn()
      
      if (result.error) {
        setError(result.error)
        setData(null)
      } else {
        setData(result.data)
      }
    } catch (err) {
      setError(err)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (refetchOnMount) {
      refetch()
    }
  }, [profile, enabled, ...dependencies])

  return { data, loading, error, refetch }
}

// Example usage hooks for common queries
export function useWorkflows() {
  const { profile } = useAuth()
  
  return useSupabaseQuery(
    async () => {
      const { data, error } = await supabase
        .from('workflows')
        .select(`
          *,
          workflow_marketplaces(
            marketplace_id,
            marketplace_template_url,
            marketplaces(name, display_name)
          )
        `)
        .order('created_at', { ascending: false })

      return { data, error }
    },
    [profile?.organization_id]
  )
}

export function useOrganizationMembers() {
  const { profile } = useAuth()
  
  return useSupabaseQuery(
    async () => {
      if (profile?.system_role !== 'client_user') return { data: null, error: null }

      const { data, error } = await supabase
        .from('organization_members')
        .select(`
          *,
          users(
            id,
            email,
            first_name,
            last_name,
            phone,
            status,
            last_login
          )
        `)
        .order('created_at', { ascending: false })

      return { data, error }
    },
    [profile?.organization_id],
    { enabled: profile?.system_role === 'client_user' }
  )
}

export function useGeneratedFiles() {
  const { profile } = useAuth()
  
  return useSupabaseQuery(
    async () => {
      const { data, error } = await supabase
        .from('generated_files')
        .select(`
          *,
          workflow_runs(
            workflow_id,
            workflows(name, brand)
          )
        `)
        .order('generated_at', { ascending: false })

      return { data, error }
    },
    [profile?.organization_id]
  )
}