import MarketingHeader from '@/components/navigation/marketing-header'
import { getCachedGlobal } from '@/lib/get-cached-global'
import { Header } from '@/payload-types'

type Props = {
  children: React.ReactNode
}

const SlugLayout: React.FC<Props> = async ({ children }) => {
  const header: Header = await getCachedGlobal('header', 1)()
  return (
    <>
      <MarketingHeader header={header} />
      <pre>{JSON.stringify(header, null, 2)}</pre>
      {children}
    </>
  )
}
export default SlugLayout
