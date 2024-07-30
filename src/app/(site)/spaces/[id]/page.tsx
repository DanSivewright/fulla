import { createPage } from '@/lib/create-page'

const { Page } = createPage({
  component: ({ params: { id } }) => {
    return <div>This is a specific space: {id}</div>
  },
})

export default Page
