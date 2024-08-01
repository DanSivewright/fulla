import { ThemeProvider } from '@/components/providers/theme-provider'
import localFont from 'next/font/local'
const regola = localFont({
  src: [
    {
      path: '../../../public/fonts/RegolaLight.otf',
      style: 'italic',
      weight: '200',
    },
    {
      path: '../../../public/fonts/RegolaProBook.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/RegolaProBookOblique.otf',
      style: 'oblique',
      weight: '300',
    },
    {
      path: '../../../public/fonts/RegolaProRegular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/RegolaProRegularOblique.otf',
      weight: '400',
      style: 'oblique',
    },
    {
      path: '../../../public/fonts/RegolaProMedium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/RegolaProMediumOblique.otf',
      style: 'oblique',
      weight: '500',
    },
    {
      path: '../../../public/fonts/RegolaBoldOblique.otf',
      style: 'italic',
      weight: '700',
    },

    {
      path: '../../../public/fonts/RegolaProBold.otf',
      weight: '700',
    },
  ],
  variable: '--font-regola',
})

import '../../styles/globals.css'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${regola.variable} font-sans`} suppressHydrationWarning lang="en">
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
