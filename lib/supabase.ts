import { createClient } from '@supabase/supabase-js'
import type { Database } from './database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// For development, provide fallback values to prevent crashes
const defaultUrl = 'https://your-project.supabase.co'
const defaultKey = 'your-anon-key-here'

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === defaultUrl || supabaseAnonKey === defaultKey) {
  console.warn('⚠️  Supabase environment variables not configured. Please set up your Supabase project.')
  console.warn('📝 Update NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
}

export const supabase = createClient<Database>(
  supabaseUrl || defaultUrl, 
  supabaseAnonKey || defaultKey, 
  {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})