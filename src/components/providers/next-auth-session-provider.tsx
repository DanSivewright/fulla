"use client"

import { SessionProvider } from "next-auth/react"

type Props = {
  children: React.ReactNode
}
export const NextAuthSessionProvider: React.FC<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}
