import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  phone: string | null
  system_role: string
  status: string
  organization_id?: string
  organization_role?: string
  organization_name?: string
}

export interface AuthState {
  user: User | null
  profile: UserProfile | null
  loading: boolean
}

// Set user context for RLS policies
export async function setUserContext(profile: UserProfile) {
  try {
    // Set session variables for RLS policies
    const { error } = await supabase.rpc('set_user_context', {
      user_id: profile.id,
      organization_id: profile.organization_id || null,
      system_role: profile.system_role,
      organization_role: profile.organization_role || null
    })

    if (error) {
      console.error('Error setting user context:', error)
      throw error
    }
  } catch (error) {
    console.error('Failed to set user context:', error)
    throw error
  }
}

// Get user profile with organization details
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    // First get the user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .eq('deleted_at', null)
      .single()

    if (userError || !userData) {
      console.error('Error fetching user:', userError)
      return null
    }

    // If it's a client user, get their organization membership
    if (userData.system_role === 'client_user') {
      const { data: memberData, error: memberError } = await supabase
        .from('organization_members')
        .select(`
          role,
          organization_id,
          organizations!inner(
            name,
            status
          )
        `)
        .eq('user_id', userId)
        .eq('status', 'active')
        .single()

      if (memberError || !memberData) {
        console.error('Error fetching organization membership:', memberError)
        return null
      }

      return {
        id: userData.id,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone: userData.phone,
        system_role: userData.system_role,
        status: userData.status,
        organization_id: memberData.organization_id,
        organization_role: memberData.role,
        organization_name: memberData.organizations.name
      }
    }

    // For provider users, no organization context needed
    return {
      id: userData.id,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone: userData.phone,
      system_role: userData.system_role,
      status: userData.status
    }
  } catch (error) {
    console.error('Error in getUserProfile:', error)
    return null
  }
}

// Sign up new user
export async function signUp(email: string, password: string, userData: {
  first_name: string
  last_name: string
  organization_name: string
  phone?: string
}) {
  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          organization_name: userData.organization_name,
          phone: userData.phone
        }
      }
    })

    if (authError) {
      throw authError
    }

    return { user: authData.user, session: authData.session }
  } catch (error) {
    console.error('Error in signUp:', error)
    throw error
  }
}

// Sign in user
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      throw error
    }

    // Get user profile and set context
    if (data.user) {
      const profile = await getUserProfile(data.user.id)
      if (profile) {
        await setUserContext(profile)
      }
    }

    return { user: data.user, session: data.session }
  } catch (error) {
    console.error('Error in signIn:', error)
    throw error
  }
}

// Sign out user
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error in signOut:', error)
    throw error
  }
}

// Get current session
export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      throw error
    }
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}