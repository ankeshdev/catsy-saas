"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { FileText, AlertCircle, Clock } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: 'client_user' | 'provider_admin'
  requiredOrgRole?: 'admin' | 'editor' | 'analyst'
  redirectTo?: string
}

export function AuthGuard({ 
  children, 
  requiredRole, 
  requiredOrgRole,
  redirectTo = '/login' 
}: AuthGuardProps) {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      // No user authenticated
      if (!user || !profile) {
        router.push(redirectTo)
        return
      }

      // Check if user account is pending approval
      if (profile.status === 'pending_approval') {
        router.push('/pending-approval')
        return
      }

      // Check if user account is inactive
      if (profile.status !== 'active') {
        router.push('/account-inactive')
        return
      }

      // Check system role requirement
      if (requiredRole && profile.system_role !== requiredRole) {
        // Redirect based on actual role
        if (profile.system_role === 'client_user') {
          router.push('/app/dashboard')
        } else if (profile.system_role === 'provider_admin') {
          router.push('/provider/dashboard')
        } else {
          router.push('/login')
        }
        return
      }

      // Check organization role requirement (only for client users)
      if (requiredOrgRole && profile.system_role === 'client_user') {
        const allowedRoles = {
          'admin': ['admin'],
          'editor': ['admin', 'editor'],
          'analyst': ['admin', 'editor', 'analyst']
        }

        if (!profile.organization_role || 
            !allowedRoles[requiredOrgRole].includes(profile.organization_role)) {
          router.push('/app/dashboard')
          return
        }
      }
    }
  }, [user, profile, loading, requiredRole, requiredOrgRole, redirectTo, router])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
            <Skeleton className="h-6 w-32 mx-auto mb-2" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show pending approval state
  if (profile?.status === 'pending_approval') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Your Account is Under Review</h1>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 leading-relaxed">
              Thank you for signing up. An account manager will approve your request within 24 hours.
              We'll notify you by email once it's ready.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show inactive account state
  if (profile?.status !== 'active') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Account Inactive</h1>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 leading-relaxed">
              Your account is currently inactive. Please contact support for assistance.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // User is authenticated and authorized
  return <>{children}</>
}