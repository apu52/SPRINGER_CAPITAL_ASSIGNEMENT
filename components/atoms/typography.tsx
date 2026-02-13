import { cn } from "@/lib/utils"

interface TypographyProps {
  children: React.ReactNode
  className?: string
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold tracking-tight text-foreground",
        className
      )}
    >
      {children}
    </h1>
  )
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "text-2xl font-semibold tracking-tight text-foreground",
        className
      )}
    >
      {children}
    </h2>
  )
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold tracking-tight text-foreground",
        className
      )}
    >
      {children}
    </h3>
  )
}

export function Paragraph({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-sm leading-relaxed text-muted-foreground", className)}>
      {children}
    </p>
  )
}

export function Muted({ children, className }: TypographyProps) {
  return (
    <span className={cn("text-xs text-muted-foreground", className)}>
      {children}
    </span>
  )
}

export function Mono({ children, className }: TypographyProps) {
  return (
    <span className={cn("font-mono text-sm tabular-nums", className)}>
      {children}
    </span>
  )
}
