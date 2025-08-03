import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types (will be generated from your schema)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password_hash: string
          first_name: string
          last_name: string
          phone: string | null
          system_role: string
          status: string
          created_at: string
          updated_at: string
          last_login: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          first_name: string
          last_name: string
          phone?: string | null
          system_role: string
          status?: string
          created_at?: string
          updated_at?: string
          last_login?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          system_role?: string
          status?: string
          created_at?: string
          updated_at?: string
          last_login?: string | null
          deleted_at?: string | null
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          contact_email: string
          contact_phone: string | null
          address: string | null
          tax_id: string | null
          industry: string | null
          website: string | null
          plan_id: string
          subscription_start_date: string | null
          subscription_end_date: string | null
          trial_end_date: string | null
          status: string
          notes: string | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          name: string
          contact_email: string
          contact_phone?: string | null
          address?: string | null
          tax_id?: string | null
          industry?: string | null
          website?: string | null
          plan_id: string
          subscription_start_date?: string | null
          subscription_end_date?: string | null
          trial_end_date?: string | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          contact_email?: string
          contact_phone?: string | null
          address?: string | null
          tax_id?: string | null
          industry?: string | null
          website?: string | null
          plan_id?: string
          subscription_start_date?: string | null
          subscription_end_date?: string | null
          trial_end_date?: string | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      organization_members: {
        Row: {
          user_id: string
          organization_id: string
          role: string
          department: string | null
          join_date: string
          is_owner: boolean
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          organization_id: string
          role: string
          department?: string | null
          join_date?: string
          is_owner?: boolean
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          organization_id?: string
          role?: string
          department?: string | null
          join_date?: string
          is_owner?: boolean
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      workflows: {
        Row: {
          id: string
          organization_id: string
          name: string
          description: string | null
          brand: string | null
          category: string | null
          status: string
          schedule: string | null
          master_template_url: string | null
          created_by_user_id: string
          created_at: string
          updated_at: string
          priority: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          description?: string | null
          brand?: string | null
          category?: string | null
          status?: string
          schedule?: string | null
          master_template_url?: string | null
          created_by_user_id: string
          created_at?: string
          updated_at?: string
          priority?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          organization_id?: string
          name?: string
          description?: string | null
          brand?: string | null
          category?: string | null
          status?: string
          schedule?: string | null
          master_template_url?: string | null
          created_by_user_id?: string
          created_at?: string
          updated_at?: string
          priority?: string
          deleted_at?: string | null
        }
      }
    }
  }
}