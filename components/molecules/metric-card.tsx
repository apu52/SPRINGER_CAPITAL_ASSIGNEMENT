"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mono, Muted } from "@/components/atoms/typography"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
}: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="flex items-center gap-4 p-5">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
            "bg-primary/10 text-primary"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex flex-col gap-0.5">
          <Muted>{title}</Muted>
          <div className="flex items-baseline gap-2">
            <Mono className="text-xl font-bold text-foreground">{value}</Mono>
            {change && (
              <span
                className={cn(
                  "text-xs font-medium",
                  changeType === "positive" && "text-emerald-500",
                  changeType === "negative" && "text-red-500",
                  changeType === "neutral" && "text-muted-foreground"
                )}
              >
                {change}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
