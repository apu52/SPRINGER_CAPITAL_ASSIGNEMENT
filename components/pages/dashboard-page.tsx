"use client"

import { useEffect, useState, useCallback } from "react"
import { DashboardLayout } from "@/components/templates/dashboard-layout"
import { SalesChart } from "@/components/organisms/sales-chart"
import { MetricCard } from "@/components/molecules/metric-card"
import { H1, Paragraph } from "@/components/atoms/typography"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, TrendingUp, BarChart3, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ChartType } from "@/components/organisms/chart-controls"
import type { SalesRecord } from "@/lib/data"

const AVAILABLE_YEARS = [2022, 2023, 2024]

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-[480px] rounded-lg" />
    </div>
  )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-7 w-7 text-destructive" />
      </div>
      <div className="text-center">
        <H1 className="text-xl">Failed to load data</H1>
        <Paragraph className="mt-1">
          There was an error fetching sales data. Please try again.
        </Paragraph>
      </div>
      <Button onClick={onRetry} variant="outline">
        Retry
      </Button>
    </div>
  )
}

export function DashboardPage() {
  const [data, setData] = useState<SalesRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [chartType, setChartType] = useState<ChartType>("bar")
  const [selectedYears, setSelectedYears] = useState<number[]>([2022, 2023, 2024])
  const [threshold, setThreshold] = useState("")

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch("/api/sales")
      if (!res.ok) throw new Error("Failed to fetch")
      const json = await res.json()
      setData(json.data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const toggleYear = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year)
        ? prev.length > 1
          ? prev.filter((y) => y !== year)
          : prev
        : [...prev, year].sort()
    )
  }

  // Calculate metrics
  const thresholdNum = threshold ? Number(threshold) : 0
  const filteredData = data.filter((d) => d.revenue >= thresholdNum)
  const totalSales = filteredData.reduce((sum, d) => sum + d.revenue, 0)
  const highestMonth = filteredData.reduce(
    (max, d) => (d.revenue > max.revenue ? d : max),
    filteredData[0] || { revenue: 0, month: "-", year: 0 }
  )
  const averageSales =
    filteredData.length > 0
      ? Math.round(totalSales / filteredData.length)
      : 0

  return (
    <DashboardLayout>
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorState onRetry={fetchData} />
      ) : (
        <div className="flex flex-col gap-6">
          {/* Page header */}
          <div className="flex flex-col gap-1">
            <H1>Dashboard</H1>
            <Paragraph>
              Track your sales performance across 2022, 2023, and 2024.
            </Paragraph>
          </div>

          {/* Metrics cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MetricCard
              title="Total Revenue"
              value={`$${totalSales.toLocaleString()}`}
              change="+23.5%"
              changeType="positive"
              icon={DollarSign}
            />
            <MetricCard
              title="Highest Month"
              value={`$${highestMonth.revenue.toLocaleString()}`}
              change={`${highestMonth.month} ${highestMonth.year}`}
              changeType="neutral"
              icon={TrendingUp}
            />
            <MetricCard
              title="Average Monthly"
              value={`$${averageSales.toLocaleString()}`}
              change="per month"
              changeType="neutral"
              icon={BarChart3}
            />
          </div>

          {/* Main chart */}
          <SalesChart
            data={data}
            chartType={chartType}
            onChartTypeChange={setChartType}
            years={AVAILABLE_YEARS}
            selectedYears={selectedYears}
            onToggleYear={toggleYear}
            threshold={threshold}
            onThresholdChange={setThreshold}
          />

          {/* Data table summary */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Month
                      </th>
                      {selectedYears.map((year) => (
                        <th
                          key={year}
                          className="px-4 py-3 text-right font-mono font-medium text-muted-foreground"
                        >
                          {year}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                    ].map((month) => (
                      <tr
                        key={month}
                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          {month}
                        </td>
                        {selectedYears.map((year) => {
                          const record = data.find(
                            (d) => d.year === year && d.month === month
                          )
                          const revenue = record?.revenue ?? 0
                          const belowThreshold =
                            thresholdNum > 0 && revenue < thresholdNum
                          return (
                            <td
                              key={year}
                              className={`px-4 py-2.5 text-right font-mono ${
                                belowThreshold
                                  ? "text-muted-foreground/50"
                                  : "text-foreground"
                              }`}
                            >
                              ${revenue.toLocaleString()}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  )
}
