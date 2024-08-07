import { cookies } from "next/headers"
import { User } from "@/payload-types"
import NextAuth, { DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { object, string, ZodError } from "zod"

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      token: string
      payloadExp: number
    } & Pick<User, "id" | "company" | "name" | "role" | "email"> &
      DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          )

          if (!res.ok) throw new Error("Invalid login")

          const { user, token, exp } = await res.json()

          // cookies().set({
          //   name: "payload-token",
          //   value: token,
          //   expires: new Date(exp),
          //   httpOnly: true,
          //   path: "/",
          // })

          return {
            ...user,
            token,
            payloadExp: exp,
          }
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return {
        ...token,
        ...user,
      }
      // if (token.refreshToken) {
      //   const newToken = await refreshToken(token.refreshToken)
      //   console.log("newToken::: ", newToken)
      // }

      // console.log("token exps::: ", token.expiresAt)
      // if (account) {
      //   return {
      //     ...token,
      //     ...user,
      //     // accessTokenNew: "DANNY UPDATED THIS",
      //   }
      //   // @ts-ignore
      // } else if (isBefore(new Date(), new Date(token?.expiresAt))) {
      //   return {
      //     ...token,
      //     ...user,
      //   }
      // } else {
      //   console.log("O AM NOT VALID")
      //   if (!token.refreshToken) throw new Error("Missing refresh token")

      //   const res = await fetch(
      //     `https://securetoken.googleapis.com/v1/token?key=${env.GCP_API_KEY}`,
      //     {
      //       method: "POST",
      //       body: JSON.stringify({
      //         grant_type: "refresh_token",
      //         refresh_token: token?.refreshToken,
      //       }),
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   )

      //   if (!res.ok) {
      //     throw new Error("Failed to refresh token")
      //   }

      //   const refresh = await res.json()

      //   return {
      //     ...token,
      //     ...user,
      //     accessToken: refresh.access_token,
      //     refreshToken: refresh.refresh_token,
      //     expiresAt: expiryDateAsISOString(),
      //   }
      // }
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      }
    },
  },
  basePath: "/auth",
  cookies: {},
  secret: process.env.AUTH_SECRET,
})
