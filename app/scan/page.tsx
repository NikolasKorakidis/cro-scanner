"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Loader2, Download, ArrowLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { jsPDF } from "jspdf"

export default function ScanPage() {
  const searchParams = useSearchParams()
  const url = searchParams.get("url")
  const [loading, setLoading] = useState(true)
  const [scanResults, setScanResults] = useState(null)
  const reportRef = useRef(null)

  useEffect(() => {
    if (url) {
      // Simulate scanning process
      const timer = setTimeout(() => {
        setScanResults(generateScanResults(url))
        setLoading(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [url])

  const generatePDF = () => {
    if (!scanResults || !url) return

    // Create a new jsPDF instance
    const pdf = new jsPDF()
    const domain = new URL(url).hostname

    // Add title
    pdf.setFontSize(22)
    pdf.setTextColor(33, 150, 243) // Material blue
    pdf.text("CRO Analysis Report", 20, 20)

    // Add website info
    pdf.setFontSize(16)
    pdf.setTextColor(0, 0, 0)
    pdf.text(`Website: ${domain}`, 20, 30)
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40)

    // Add scores
    pdf.setFontSize(14)
    pdf.text(`Mobile Score: ${scanResults.mobileScore}/100`, 20, 55)
    pdf.text(`Desktop Score: ${scanResults.desktopScore}/100`, 20, 65)

    // Helper function to add a section
    const addSection = (title, items, startY) => {
      let y = startY

      // Section title
      pdf.setFontSize(16)
      pdf.setTextColor(33, 150, 243) // Material blue
      pdf.text(title, 20, y)
      y += 10

      // Items
      pdf.setTextColor(0, 0, 0)
      items.forEach((item, index) => {
        // Check if we need a new page
        if (y > 270) {
          pdf.addPage()
          y = 20
        }

        // Item title
        pdf.setFontSize(12)
        pdf.setFont("helvetica", "bold")
        pdf.text(item.title, 20, y)
        y += 8

        // Item description
        pdf.setFont("helvetica", "normal")
        pdf.setFontSize(10)

        // Split text to fit page width
        const splitText = pdf.splitTextToSize(item.description, 170)
        pdf.text(splitText, 20, y)

        // Move y position based on number of lines
        y += splitText.length * 6 + 10
      })

      return y
    }

    // Add performance section
    let currentY = 80
    currentY = addSection("Website Performance", scanResults.performance, currentY)

    // Add new page for UX section
    pdf.addPage()
    currentY = addSection("UX & Funnel Analysis", scanResults.uxFunnel, 20)

    // Add new page for quick wins
    pdf.addPage()
    currentY = addSection("Top 3 Quick Wins", scanResults.quickWins, 20)

    // Add new page for recommendations
    pdf.addPage()
    addSection("Recommendations", scanResults.recommendations, 20)

    // Save the PDF
    pdf.save(`cro-report-${domain}.pdf`)
  }

  if (!url) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">No URL provided</h1>
        <Link href="/" className="mt-4 text-blue-500 hover:underline">
          Go back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-blue-600 text-white">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">QuickCRO</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 container px-4 py-8 md:px-6">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">CRO Scan Results</h1>
          {!loading && (
            <Button onClick={generatePDF} className="ml-auto bg-blue-600 hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <p className="mt-4 text-lg text-gray-700">Scanning {url}...</p>
            <div className="mt-8 w-full max-w-md">
              <Progress value={45} className="h-2 w-full bg-gray-200 [&>div]:bg-blue-600" />
            </div>
          </div>
        ) : (
          <div id="scan-report" ref={reportRef} className="space-y-8">
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-600">Website: {new URL(url).hostname}</CardTitle>
                <p className="text-sm text-gray-500">Scan completed on {new Date().toLocaleString()}</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="font-medium">Mobile Performance</h3>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={scanResults.mobileScore}
                        className="h-2 w-full bg-gray-200 [&>div]:bg-blue-600"
                      />
                      <span className="text-sm font-medium">{scanResults.mobileScore}/100</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Desktop Performance</h3>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={scanResults.desktopScore}
                        className="h-2 w-full bg-gray-200 [&>div]:bg-green-600"
                      />
                      <span className="text-sm font-medium">{scanResults.desktopScore}/100</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="performance">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                <TabsTrigger
                  value="performance"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Performance
                </TabsTrigger>
                <TabsTrigger value="ux" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  UX & Funnel
                </TabsTrigger>
                <TabsTrigger
                  value="quickwins"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Quick Wins
                </TabsTrigger>
                <TabsTrigger
                  value="recommendations"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Recommendations
                </TabsTrigger>
              </TabsList>

              <TabsContent value="performance" className="mt-4 space-y-4">
                <Card className="overflow-hidden shadow-lg">
                  <CardHeader className="bg-red-50">
                    <CardTitle className="text-red-600">Website Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scanResults.performance.map((item, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ux" className="mt-4 space-y-4">
                <Card className="overflow-hidden shadow-lg">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="text-blue-600">UX & Funnel Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scanResults.uxFunnel.map((item, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quickwins" className="mt-4 space-y-4">
                <Card className="overflow-hidden shadow-lg">
                  <CardHeader className="bg-yellow-50">
                    <CardTitle className="text-yellow-600">Top 3 Quick Wins</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scanResults.quickWins.map((item, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium">
                          {index + 1}. {item.title}
                        </h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="mt-4 space-y-4">
                <Card className="overflow-hidden shadow-lg">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="text-green-600">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scanResults.recommendations.map((item, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
      <footer className="border-t bg-gray-100">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-600">© 2025 QuickCRO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function generateScanResults(url) {
  // This function simulates generating scan results
  // In a real app, this would be replaced with actual analysis

  const domain = new URL(url).hostname

  return {
    mobileScore: Math.floor(Math.random() * 30) + 50,
    desktopScore: Math.floor(Math.random() * 20) + 70,
    performance: [
      {
        title: "Page Load Speed",
        description: `${domain} takes approximately 3.2 seconds to load on mobile devices, which is slower than the recommended 2 seconds. Desktop performance is better at 1.8 seconds.`,
      },
      {
        title: "Core Web Vitals",
        description:
          "Largest Contentful Paint (LCP) needs improvement. First Input Delay (FID) and Cumulative Layout Shift (CLS) are within acceptable ranges.",
      },
      {
        title: "Image Optimization",
        description: "Several images on the homepage are not properly optimized, contributing to slower load times.",
      },
      {
        title: "JavaScript Execution",
        description: "JavaScript execution is taking longer than optimal, particularly on mobile devices.",
      },
    ],
    uxFunnel: [
      {
        title: "Homepage UX Assessment",
        description:
          "The value proposition is not immediately clear above the fold. Users may struggle to understand what the site offers within the first 5 seconds.",
      },
      {
        title: "CTA Placement and Visibility",
        description:
          "Primary CTAs blend in with the page design, reducing their visibility. The main CTA appears below the fold on mobile devices.",
      },
      {
        title: "Navigation Usability",
        description:
          "The navigation structure is complex with too many options, potentially overwhelming users. Mobile navigation requires optimization.",
      },
      {
        title: "Trust Signals",
        description:
          "Testimonials and social proof elements are present but not prominently displayed. Customer reviews are difficult to find.",
      },
      {
        title: "Form Friction",
        description:
          "The contact/checkout form has unnecessary fields that may increase abandonment rates. Error handling could be improved.",
      },
    ],
    quickWins: [
      {
        title: "Optimize Above-the-Fold Content",
        description:
          "Restructure the homepage to clearly communicate your value proposition above the fold and make primary CTAs more prominent.",
      },
      {
        title: "Compress and Optimize Images",
        description:
          "Implement proper image compression and lazy loading to improve page load times by approximately 30%.",
      },
      {
        title: "Simplify Navigation",
        description:
          "Reduce navigation options and implement a more intuitive structure to help users find what they're looking for more easily.",
      },
    ],
    recommendations: [
      {
        title: "Implement Progressive Web App Features",
        description: "Convert your site to a PWA to improve mobile performance and engagement.",
      },
      {
        title: "Redesign Form Experience",
        description:
          "Simplify forms by removing unnecessary fields and implementing inline validation to reduce friction.",
      },
      {
        title: "Enhance Trust Signals",
        description:
          "Make customer testimonials and reviews more prominent throughout the site, especially near CTAs and on product pages.",
      },
      {
        title: "Implement A/B Testing",
        description: "Set up A/B testing for key landing pages to continuously optimize conversion rates.",
      },
      {
        title: "Optimize Mobile Experience",
        description: "Redesign the mobile experience with touch-friendly elements and simplified navigation.",
      },
      {
        title: "Improve Page Speed",
        description: "Minimize render-blocking resources and implement proper caching to improve overall page speed.",
      },
    ],
  }
}
