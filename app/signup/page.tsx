"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FileText, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    organization: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      await signUp(formData.email, formData.password, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        organization_name: formData.organization,
        phone: formData.phone || undefined
      })
      
      setSuccess(true)
      // Redirect to pending approval page after a short delay
      setTimeout(() => {
        router.push('/pending-approval')
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create your Catsy Account</h1>
          <p className="text-slate-600">Get started with automated product listing management</p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Account created successfully! Redirecting to approval page...
              </AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="organization">Organization Name</Label>
              <Input 
                id="organization" 
                name="organization"
                placeholder="Enter your organization name" 
                value={formData.organization}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName"
                  placeholder="First name" 
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName"
                  placeholder="Last name" 
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="Enter your email" 
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password"
                type="password" 
                placeholder="Create a password" 
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword"
                type="password" 
                placeholder="Confirm your password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input 
                id="phone" 
                name="phone"
                type="tel" 
                placeholder="Enter your phone number" 
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
                className="w-full" 
              />
            </div>
            <Button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="text-center">
            <Link href="/login" className="text-sm text-indigo-600 hover:text-indigo-700">
              Already have an account? Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
