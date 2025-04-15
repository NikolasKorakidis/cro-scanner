import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="w-full border-b bg-blue-600 text-white">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">QuickCRO</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Conversion Rate Optimization Scanner
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Analyze your website and get actionable insights to improve your conversion rates.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form action="/scan" className="flex flex-col space-y-4">
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <input
                      type="url"
                      name="url"
                      placeholder="Enter website URL"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    />
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Scan
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-red-50 dark:bg-red-900/20">
                  <CardTitle className="text-red-600 dark:text-red-400">Performance Analysis</CardTitle>
                  <CardDescription>
                    Get detailed insights on your website's performance on both mobile and desktop.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Analyze loading speeds, Core Web Vitals, and other performance metrics.</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
                  <CardTitle className="text-blue-600 dark:text-blue-400">UX & Funnel Analysis</CardTitle>
                  <CardDescription>
                    Evaluate your user experience and conversion funnel for optimization opportunities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Review navigation, CTA placement, trust signals, and checkout friction points.</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-green-50 dark:bg-green-900/20">
                  <CardTitle className="text-green-600 dark:text-green-400">Actionable Recommendations</CardTitle>
                  <CardDescription>Get prioritized recommendations to improve your conversion rates.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Receive top quick wins and detailed recommendations for long-term improvements.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-gray-100 dark:bg-gray-900">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto">
          <p className="text-sm text-gray-600 dark:text-gray-400">© 2025 QuickCRO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
