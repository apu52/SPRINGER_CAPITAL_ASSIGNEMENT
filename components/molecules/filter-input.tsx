"use client"

import { Input } from "@/components/ui/input"
import { Filter } from "lucide-react"

interface FilterInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function FilterInput({
  value,
  onChange,
  placeholder = "Min. revenue threshold...",
}: FilterInputProps) {
  return (
    <div className="relative">
      <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 font-mono text-sm"
      />
    </div>
  )
}
