import { createPage } from '@/lib/create-page'

const { Page } = createPage({
  component: () => <div>This is the site page</div>,
})

export default Page
