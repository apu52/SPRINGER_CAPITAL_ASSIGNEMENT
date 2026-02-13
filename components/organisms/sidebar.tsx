"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  Settings,
  HelpCircle,
} from "lucide-react"

interface SidebarProps {
  isMobile: boolean
  desktopOpen: boolean
  mobileOpen: boolean
  onMobileClose: () => void
}

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Analytics", icon: BarChart3, active: false },
  { label: "Reports", icon: TrendingUp, active: false },
  { label: "Settings", icon: Settings, active: false },
  { label: "Help", icon: HelpCircle, active: false },
]

export function Sidebar({
  isMobile,
  desktopOpen,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const open = isMobile ? mobileOpen : desktopOpen

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && mobileOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px]"
          onClick={onMobileClose}
          aria-label="Close sidebar"
        />
      )}
      <aside
        className={cn(
          "left-0 top-0 flex h-full flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300",
          isMobile
            ? cn("fixed z-50 w-60", mobileOpen ? "translate-x-0" : "-translate-x-full")
            : cn("relative z-auto", desktopOpen ? "w-60" : "w-16")
        )}
      >
        {/* Logo area */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <BarChart3 className="h-4 w-4" />
          </div>
          <span
            className={cn(
              "text-sm font-semibold text-sidebar-primary-foreground transition-opacity duration-200",
              open ? "opacity-100" : "opacity-0 hidden"
            )}
          >
            SalesHub
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4" aria-label="Sidebar navigation">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (isMobile) onMobileClose()
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                item.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              <span
                className={cn(
                  "transition-opacity duration-200",
                  open ? "opacity-100" : "opacity-0 hidden"
                )}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-3">
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg px-2 py-2",
              open ? "" : "justify-center"
            )}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-bold text-sidebar-accent-foreground">
              SA
            </div>
            <div
              className={cn(
                "flex flex-col transition-opacity duration-200",
                open ? "opacity-100" : "opacity-0 hidden"
              )}
            >
              <span className="text-xs font-medium text-sidebar-accent-foreground">
                Sales Admin
              </span>
              <span className="text-[10px] text-sidebar-foreground">
                admin@saleshub.io
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
