import { ThemeProvider } from '@/components/providers/theme-provider'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import '../../styles/globals.css'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
      lang="en"
    >
      <body>
        <main className="relative">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
