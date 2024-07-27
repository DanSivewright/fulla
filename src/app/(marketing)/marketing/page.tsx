import { createPage } from '@/lib/create-page'

const { Page } = createPage({
  metadata: async () => {
    return {
      title: 'Marketing Page',
      description: 'Marketing Page Description',
    }
  },
  component: () => <div>Hello World</div>,
})

export default Page
