"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  LayoutDashboard,
  Users,
  Workflow,
  BarChart3,
  UserCheck,
  Settings,
  Search,
  ChevronDown,
  User,
  LogOut,
  Bell,
  File,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/provider/dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/provider/clients", icon: Users },
  { name: "Workflows", href: "/provider/workflows", icon: Workflow },
  { name: "Analytics", href: "/provider/analytics", icon: BarChart3 },
  { name: "Manage Team", href: "/provider/team", icon: UserCheck },
  { name: "Account Settings", href: "/provider/settings", icon: Settings },
]

// Mock search results data
const searchResults = [
  {
    type: "client",
    title: "TechBrand Electronics",
    description: "Active client - 12 workflows",
    href: "/provider/clients",
    icon: Building2,
  },
  {
    type: "workflow",
    title: "Electronics Listing Workflow",
    description: "Amazon, Flipkart integration",
    href: "/provider/workflows",
    icon: Workflow,
  },
  {
    type: "team",
    title: "Sarah Johnson",
    description: "Workflow Manager",
    href: "/provider/team",
    icon: UserCheck,
  },
  {
    type: "file",
    title: "monthly_report_jan2025.pdf",
    description: "Generated 1 hour ago",
    href: "/provider/analytics",
    icon: File,
  },
]

interface ProviderLayoutProps {
  children: React.ReactNode
}

export function ProviderLayout({ children }: ProviderLayoutProps) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResults = searchResults.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 flex flex-col" style={{ backgroundColor: "#ecf2fa" }}>
        {/* Logo */}
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-slate-800">Catsy</span>
            <Badge variant="secondary" className="ml-2 text-xs bg-slate-200 text-slate-700">
              Provider
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 pb-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-200 hover:text-slate-900",
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-6 border-t border-slate-300">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-700 hover:bg-slate-200 hover:text-slate-900"
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium">Provider Admin</p>
                    <p className="text-xs text-slate-500">admin@provider.com</p>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/provider/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Built by Nexen Labs */}
        <div className="px-6 pb-4">
          <p className="text-xs text-slate-500 text-center">Built by Nexen Labs</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex h-16 items-center justify-between px-8">
            <div className="flex items-center space-x-4">{/* Breadcrumb or page title could go here */}</div>

            <div className="flex items-center space-x-4">
              {/* Global Search */}
              <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={searchOpen}
                    className="w-80 justify-start text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 bg-transparent"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search...
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <Command>
                    <CommandInput
                      placeholder="Search clients, workflows, team..."
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                    />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      {searchQuery && (
                        <>
                          <CommandGroup heading="Clients">
                            {filteredResults
                              .filter((item) => item.type === "client")
                              .map((item) => (
                                <CommandItem
                                  key={item.title}
                                  onSelect={() => {
                                    setSearchOpen(false)
                                    setSearchQuery("")
                                  }}
                                >
                                  <item.icon className="mr-2 h-4 w-4" />
                                  <div className="flex flex-col">
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-xs text-slate-500">{item.description}</span>
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                          <CommandGroup heading="Workflows">
                            {filteredResults
                              .filter((item) => item.type === "workflow")
                              .map((item) => (
                                <CommandItem
                                  key={item.title}
                                  onSelect={() => {
                                    setSearchOpen(false)
                                    setSearchQuery("")
                                  }}
                                >
                                  <item.icon className="mr-2 h-4 w-4" />
                                  <div className="flex flex-col">
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-xs text-slate-500">{item.description}</span>
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                          <CommandGroup heading="Team">
                            {filteredResults
                              .filter((item) => item.type === "team")
                              .map((item) => (
                                <CommandItem
                                  key={item.title}
                                  onSelect={() => {
                                    setSearchOpen(false)
                                    setSearchQuery("")
                                  }}
                                >
                                  <item.icon className="mr-2 h-4 w-4" />
                                  <div className="flex flex-col">
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-xs text-slate-500">{item.description}</span>
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                          <CommandGroup heading="Files">
                            {filteredResults
                              .filter((item) => item.type === "file")
                              .map((item) => (
                                <CommandItem
                                  key={item.title}
                                  onSelect={() => {
                                    setSearchOpen(false)
                                    setSearchQuery("")
                                  }}
                                >
                                  <item.icon className="mr-2 h-4 w-4" />
                                  <div className="flex flex-col">
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-xs text-slate-500">{item.description}</span>
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">5</Badge>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
