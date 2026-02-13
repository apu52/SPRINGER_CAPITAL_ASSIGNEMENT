"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface YearSelectorProps {
  years: number[]
  selectedYears: number[]
  onToggle: (year: number) => void
}

export function YearSelector({ years, selectedYears, onToggle }: YearSelectorProps) {
  return (
    <div className="flex items-center gap-1.5">
      {years.map((year) => {
        const isSelected = selectedYears.includes(year)
        return (
          <Button
            key={year}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onToggle(year)}
            className={cn(
              "font-mono text-xs",
              !isSelected && "text-muted-foreground"
            )}
          >
            {year}
          </Button>
        )
      })}
    </div>
  )
}
