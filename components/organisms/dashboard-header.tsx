"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { H2 } from "@/components/atoms/typography"
import { Moon, Sun, PanelLeftClose, PanelLeft } from "lucide-react"

interface DashboardHeaderProps {
  isMobile: boolean
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function DashboardHeader({
  isMobile,
  sidebarOpen,
  onToggleSidebar,
}: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="text-muted-foreground hover:text-foreground"
          aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
        >
          {isMobile ? (
            <PanelLeft className="h-5 w-5" />
          ) : sidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeft className="h-5 w-5" />
          )}
        </Button>
        <H2 className="text-lg">Sales Analytics</H2>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </header>
  )
}
