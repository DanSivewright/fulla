import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zdwzlmzfrkcov1ms.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
}

export default withPayload(nextConfig)
