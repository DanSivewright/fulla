import { withPayload } from "@payloadcms/next/withPayload"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fulla.vercel.app",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
    ],
  },
}

export default withPayload(nextConfig)
