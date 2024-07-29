import { Button } from '@/components/ui/button'
import { createPage } from '@/lib/create-page'
import Link from 'next/link'

const { Page } = createPage({
  component: () => (
    <div>
      This is the site page
      <Button asChild>
        <Link href="/marketing">Go to marketing</Link>
      </Button>
    </div>
  ),
})

export default Page
