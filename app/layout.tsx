import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FitForm AI - Smart Fitness Posture Coach",
  description:
    "AI-powered posture analysis for perfect exercise form. Upload videos or use real-time camera to get instant feedback on your workout technique.",
  keywords: "fitness, AI, posture analysis, exercise form, workout coach, pose estimation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
