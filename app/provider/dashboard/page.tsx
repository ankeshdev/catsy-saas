"use client"

import { AuthGuard } from "@/components/auth/auth-guard"
import { ProviderLayout } from "@/components/layouts/provider-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  Users,
  Workflow,
  TrendingUp,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Building2,
  FileText,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

// Mock data
const monthlyRevenue = [
  { month: "Jan", revenue: 45000, clients: 12 },
  { month: "Feb", revenue: 52000, clients: 15 },
  { month: "Mar", revenue: 48000, clients: 14 },
  { month: "Apr", revenue: 61000, clients: 18 },
  { month: "May", revenue: 55000, clients: 16 },
  { month: "Jun", revenue: 67000, clients: 20 },
]

const workflowData = [
  { name: "Completed", value: 145, color: "#10b981" },
  { name: "In Progress", value: 23, color: "#f59e0b" },
  { name: "Pending", value: 8, color: "#ef4444" },
]

const recentClients = [
  {
    id: 1,
    name: "TechBrand Electronics",
    email: "contact@techbrand.com",
    status: "Active",
    workflows: 12,
    revenue: "$15,400",
    joinDate: "2025-01-15",
  },
  {
    id: 2,
    name: "FashionCorp Apparel",
    email: "hello@fashioncorp.com",
    status: "Active",
    workflows: 8,
    revenue: "$9,200",
    joinDate: "2025-01-10",
  },
  {
    id: 3,
    name: "HomeDecor Plus",
    email: "info@homedecorplus.com",
    status: "Pending",
    workflows: 3,
    revenue: "$4,100",
    joinDate: "2025-01-20",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "workflow",
    title: "Electronics workflow completed",
    client: "TechBrand Electronics",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "client",
    title: "New client onboarded",
    client: "HomeDecor Plus",
    time: "4 hours ago",
    icon: Users,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "workflow",
    title: "Workflow requires attention",
    client: "FashionCorp Apparel",
    time: "6 hours ago",
    icon: AlertCircle,
    color: "text-amber-600",
  },
  {
    id: 4,
    type: "revenue",
    title: "Payment received",
    client: "TechBrand Electronics",
    time: "1 day ago",
    icon: DollarSign,
    color: "text-green-600",
  },
]

export default function ProviderDashboard() {
  return (
    <AuthGuard requiredRole="provider_admin">
      <ProviderLayout>
        <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">Welcome back! Here's what's happening with your business.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$67,000</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
                <span className="text-green-600">+12.5%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
                <span className="text-green-600">+3</span>
                <span className="ml-1">new this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
              <Workflow className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">176</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
                <span className="text-green-600">+23</span>
                <span className="ml-1">this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowDownRight className="mr-1 h-3 w-3 text-red-600" />
                <span className="text-red-600">-2.1%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue and client growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Workflow Status */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Workflow Status</CardTitle>
              <CardDescription>Current workflow distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={workflowData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {workflowData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {workflowData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Clients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Clients */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Recent Clients</CardTitle>
              <CardDescription>Latest client onboardings and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{client.name}</p>
                        <p className="text-xs text-slate-500">{client.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={client.status === "Active" ? "default" : "secondary"}>{client.status}</Badge>
                      <p className="text-xs text-slate-500 mt-1">{client.workflows} workflows</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full bg-slate-100 ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-slate-500">{activity.client}</p>
                      <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators for this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Workflow Completion</span>
                  <span className="text-sm text-slate-500">94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Client Satisfaction</span>
                  <span className="text-sm text-slate-500">96.8%</span>
                </div>
                <Progress value={96.8} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">On-time Delivery</span>
                  <span className="text-sm text-slate-500">91.5%</span>
                </div>
                <Progress value={91.5} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </ProviderLayout>
    </AuthGuard>
  )
}
