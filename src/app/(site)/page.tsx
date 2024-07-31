import { Button } from '@/components/ui/button'
import { createPage } from '@/lib/create-page'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

const { Page } = createPage({
  component: () => (
    <div className="flex flex-col gap-4">
      This is the site page
      <Button asChild>
        <Link href="/marketing">Go to marketing</Link>
      </Button>
      <div className="w-1/2 aspect-square bg-red-200 relative overflow-hiddden">
        <Suspense>
          <Image
            src={'/api/media/file/fulla logo.png'}
            fill
            priority
            className="object-contain"
            alt="fulla logo"
          />
        </Suspense>
      </div>
    </div>
  ),
})

export default Page
