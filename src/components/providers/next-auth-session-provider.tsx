"use client"

import { SessionProvider } from "next-auth/react"

type Props = {
  children: React.ReactNode
}
export const NextAuthSessionProvider: React.FC<Props> = ({ children }) => {
  return (
    <SessionProvider
      //
      baseUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      basePath="/auth"
    >
      {children}
    </SessionProvider>
  )
}
