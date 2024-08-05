import { ThemeProvider } from '@/components/providers/theme-provider'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import '../../styles/globals.css'
import { Header } from '@/components/navigation/header'
import { AuthProvider } from '@/components/providers/auth'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
            <AuthProvider>
              <Header />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
