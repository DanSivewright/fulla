import MarketingHeader from '@/components/navigation/marketing-header'
import { getCachedGlobal } from '@/lib/get-cached-global'
import { Header } from '@/payload-types'

import { ThemeProvider } from '@/components/providers/theme-provider'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import '../../styles/globals.css'
import { AuthProvider } from '@/components/providers/auth'
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const header: Header = await getCachedGlobal('header', 1)()
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
              <MarketingHeader header={header} />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
