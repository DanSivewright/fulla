import { Header } from "@/payload-types"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { getGlobal } from "@/lib/get-global"
import MarketingHeader from "@/components/navigation/marketing-header"
import { ThemeProvider } from "@/components/providers/theme-provider"

import "../../styles/globals.css"

import { AuthProvider } from "@/components/providers/auth"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const header: Header = await getGlobal("header", 1)()
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
      lang="en"
    >
      <body>
        <main className="relative flex flex-col min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <MarketingHeader header={header} />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
