import { NextResponse } from "next/server"

import { auth } from "@/lib/auth"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

  if (req.auth && !req.cookies.has("payload-token")) {
    console.log("setting cookie::: ")
    const response = NextResponse.next()

    response.cookies.set("payload-token", req.auth.user.token, {
      httpOnly: true,
      expires: new Date(req.auth.user.payloadExp * 1000), // Setting expiration to 7 days from now
    })

    return response
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/admin",
    "/admin/:path*",
  ],
}
