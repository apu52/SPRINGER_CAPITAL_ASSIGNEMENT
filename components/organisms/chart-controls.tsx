"use client"

import { Button } from "@/components/ui/button"
import { FilterInput } from "@/components/molecules/filter-input"
import { YearSelector } from "@/components/molecules/year-selector"
import { BarChart3, LineChart, PieChart } from "lucide-react"
import { cn } from "@/lib/utils"

export type ChartType = "bar" | "line" | "pie"

interface ChartControlsProps {
  chartType: ChartType
  onChartTypeChange: (type: ChartType) => void
  years: number[]
  selectedYears: number[]
  onToggleYear: (year: number) => void
  threshold: string
  onThresholdChange: (value: string) => void
}

const chartOptions: { type: ChartType; icon: typeof BarChart3; label: string }[] = [
  { type: "bar", icon: BarChart3, label: "Bar" },
  { type: "line", icon: LineChart, label: "Line" },
  { type: "pie", icon: PieChart, label: "Pie" },
]

export function ChartControls({
  chartType,
  onChartTypeChange,
  years,
  selectedYears,
  onToggleYear,
  threshold,
  onThresholdChange,
}: ChartControlsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        {/* Chart type switcher */}
        <div className="flex items-center gap-1 rounded-lg border bg-muted/50 p-1">
          {chartOptions.map(({ type, icon: Icon, label }) => (
            <Button
              key={type}
              variant="ghost"
              size="sm"
              onClick={() => onChartTypeChange(type)}
              className={cn(
                "gap-1.5 text-xs",
                chartType === type
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Button>
          ))}
        </div>

        {/* Year selector */}
        <YearSelector
          years={years}
          selectedYears={selectedYears}
          onToggle={onToggleYear}
        />
      </div>

      {/* Filter */}
      <div className="w-full sm:w-56">
        <FilterInput value={threshold} onChange={onThresholdChange} />
      </div>
    </div>
  )
}
