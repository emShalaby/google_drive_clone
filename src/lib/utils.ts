import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format bytes to human readable format
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// Format date to human readable format
export function formatDate(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  // Less than a day
  if (diff < 24 * 60 * 60 * 1000) {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  // Less than a week
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(date)
  }

  // Otherwise show the date
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  }).format(date)
}

