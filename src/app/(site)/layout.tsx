import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { ThemeProvider } from "@/components/providers/theme-provider"

import "../../styles/globals.css"

import { auth } from "@/lib/auth"
import { Header } from "@/components/navigation/header"
import { NextAuthSessionProvider } from "@/components/providers/next-auth-session-provider"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
      lang="en"
    >
      <body>
        <main className="relative flex min-h-screen flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextAuthSessionProvider>
              <Header />
              {children}
            </NextAuthSessionProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
