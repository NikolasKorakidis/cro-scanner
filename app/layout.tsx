import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QuickCRO - Conversion Rate Optimization Scanner",
  description: "Analyze your website and get actionable insights to improve your conversion rates.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12">
            <div className="container mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'