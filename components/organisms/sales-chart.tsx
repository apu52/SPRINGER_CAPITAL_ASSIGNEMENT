"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { H3 } from "@/components/atoms/typography"
import { ChartControls, type ChartType } from "./chart-controls"
import type { SalesRecord } from "@/lib/data"

interface SalesChartProps {
  data: SalesRecord[]
  chartType: ChartType
  onChartTypeChange: (type: ChartType) => void
  years: number[]
  selectedYears: number[]
  onToggleYear: (year: number) => void
  threshold: string
  onThresholdChange: (value: string) => void
}

const YEAR_COLORS: Record<number, string> = {
  2022: "hsl(220, 70%, 50%)",
  2023: "hsl(160, 60%, 45%)",
  2024: "hsl(30, 80%, 55%)",
}

function formatCurrency(value: number) {
  return `$${(value / 1000).toFixed(0)}K`
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number; name: string; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-card px-3 py-2 shadow-lg">
      <p className="mb-1.5 text-xs font-medium text-foreground">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-mono font-medium text-foreground">
            ${entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

export function SalesChart({
  data,
  chartType,
  onChartTypeChange,
  years,
  selectedYears,
  onToggleYear,
  threshold,
  onThresholdChange,
}: SalesChartProps) {
  const thresholdNum = threshold ? Number(threshold) : 0

  // Group data by month for bar/line charts
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ]

  const chartData = months
    .map((month) => {
      const entry: Record<string, string | number> = { month }
      selectedYears.forEach((year) => {
        const record = data.find((d) => d.year === year && d.month === month)
        const revenue = record?.revenue ?? 0
        entry[String(year)] = revenue >= thresholdNum ? revenue : 0
      })
      return entry
    })
    .filter((entry) => {
      // Keep only entries that have at least one non-zero value
      return selectedYears.some((year) => (entry[String(year)] as number) > 0)
    })

  // Pie chart data: aggregate by year
  const pieData = selectedYears.map((year) => {
    const total = data
      .filter((d) => d.year === year && d.revenue >= thresholdNum)
      .reduce((sum, d) => sum + d.revenue, 0)
    return { name: String(year), value: total, fill: YEAR_COLORS[year] }
  })

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-4">
          <H3>Revenue Overview</H3>
          <ChartControls
            chartType={chartType}
            onChartTypeChange={onChartTypeChange}
            years={years}
            selectedYears={selectedYears}
            onToggleYear={onToggleYear}
            threshold={threshold}
            onThresholdChange={onThresholdChange}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  className="fill-muted-foreground"
                  stroke="hsl(var(--border))"
                />
                <YAxis
                  tickFormatter={formatCurrency}
                  tick={{ fontSize: 12 }}
                  className="fill-muted-foreground"
                  stroke="hsl(var(--border))"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12 }}
                  iconType="circle"
                  iconSize={8}
                />
                {selectedYears.map((year) => (
                  <Bar
                    key={year}
                    dataKey={String(year)}
                    fill={YEAR_COLORS[year]}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                ))}
              </BarChart>
            ) : chartType === "line" ? (
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  className="fill-muted-foreground"
                  stroke="hsl(var(--border))"
                />
                <YAxis
                  tickFormatter={formatCurrency}
                  tick={{ fontSize: 12 }}
                  className="fill-muted-foreground"
                  stroke="hsl(var(--border))"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12 }}
                  iconType="circle"
                  iconSize={8}
                />
                {selectedYears.map((year) => (
                  <Line
                    key={year}
                    type="monotone"
                    dataKey={String(year)}
                    stroke={YEAR_COLORS[year]}
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: YEAR_COLORS[year] }}
                    activeDot={{ r: 5 }}
                  />
                ))}
              </LineChart>
            ) : (
              <PieChart>
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                    backgroundColor: "hsl(var(--card))",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 12 }}
                  iconType="circle"
                  iconSize={8}
                />
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  labelLine={{ strokeWidth: 1 }}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
