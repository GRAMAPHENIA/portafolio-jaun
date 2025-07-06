import type React from "react"
import type { Metadata } from "next"
import { Jost, Instrument_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const jost = Jost({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
  display: "swap",
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "DevPortfolio - Desarrollador Full Stack",
  description:
    "Portfolio personal de desarrollador Full Stack especializado en crear experiencias web modernas y escalables.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${jost.variable} ${instrumentSans.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
