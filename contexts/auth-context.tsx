"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { getUserProfile, setUserContext, type UserProfile, type AuthState } from '@/lib/auth'

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData: {
    first_name: string
    last_name: string
    organization_name: string
    phone?: string
  }) => Promise<void>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth state
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await loadUserProfile(session.user.id)
        } else {
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Load user profile and set RLS context
  const loadUserProfile = async (userId: string) => {
    try {
      setLoading(true)
      const userProfile = await getUserProfile(userId)
      
      if (userProfile) {
        setProfile(userProfile)
        // Set user context for RLS
        await setUserContext(userProfile)
      } else {
        setProfile(null)
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  // Sign in
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        throw error
      }

      // Profile will be loaded by the auth state change listener
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  // Sign up
  const signUp = async (email: string, password: string, userData: {
    first_name: string
    last_name: string
    organization_name: string
    phone?: string
  }) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
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

      if (error) {
        throw error
      }

      // Note: User will need approval before they can access the system
      // The profile loading will happen after email confirmation and approval
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  // Refresh profile (useful after role changes)
  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id)
    }
  }

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}