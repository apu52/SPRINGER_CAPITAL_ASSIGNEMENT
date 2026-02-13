import { NextResponse } from "next/server"
import { salesData } from "@/lib/data"

export async function GET() {
  try {
    // Simulate a small network delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return NextResponse.json({ data: salesData })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch sales data" },
      { status: 500 }
    )
  }
}
